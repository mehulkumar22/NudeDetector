require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Environment variables
const SIGHTENGINE_USER = process.env.SIGHTENGINE_USER;
const SIGHTENGINE_SECRET = process.env.SIGHTENGINE_SECRET;
const PICPURIFY_API_KEY = process.env.PICPURIFY_API_KEY;

function classifySightengine(nudityData) {
  const safe = nudityData.safe ?? 1;
  const raw = nudityData.raw ?? 0;
  if (safe === 1) return 'normal';
  if (raw > 0.85) return 'nude';
  if (raw > 0.4) return 'semi-nude';
  return 'normal';
}

function classifyPicpurify(pornContent, confidence) {
  if (pornContent) {
    if (confidence > 0.85) return 'nude';
    else if (confidence > 0.4) return 'semi-nude';
  }
  return 'normal';
}

function safeUnlink(path) {
  if (fs.existsSync(path)) fs.unlinkSync(path);
}

app.post('/detect-nudity', upload.single('image'), async (req, res) => {
  const selectedApi = req.body.api;
  const imageUrl = req.body.image_url;

  if (!req.file && !imageUrl) {
    return res.status(400).json({ error: 'No image file or URL provided' });
  }

  if (!selectedApi) {
    if (req.file) safeUnlink(req.file.path);
    return res.status(400).json({ error: 'No API selected' });
  }

  try {
    if (selectedApi === 'sightengine') {
      const params = new URLSearchParams({
        models: 'nudity',
        api_user: SIGHTENGINE_USER,
        api_secret: SIGHTENGINE_SECRET,
      });

      let response;

      if (imageUrl) {
        response = await axios.get(
          `https://api.sightengine.com/1.0/check.json?${params.toString()}&url=${encodeURIComponent(imageUrl)}`
        );
      } else {
        const imageFile = fs.createReadStream(req.file.path);
        const formData = new FormData();
        formData.append('media', imageFile);
        response = await axios.post(
          `https://api.sightengine.com/1.0/check.json?${params.toString()}`,
          formData,
          { headers: formData.getHeaders() }
        );
        safeUnlink(req.file.path);
      }

      const nudityData = response.data.nudity || {};
      const classification = classifySightengine(nudityData);
      const confidence = nudityData.raw ?? 0;
      const nudityDetected = classification !== 'normal';

      return res.json({
        api: 'Sightengine',
        nudity_detected: nudityDetected,
        classification,
        confidence_score: confidence,
        full_response: nudityData,
      });

    } else if (selectedApi === 'picpurify') {
      const formData = new FormData();
      formData.append('API_KEY', PICPURIFY_API_KEY);
      formData.append('task', 'porn_moderation');

      if (imageUrl) {
        formData.append('url_image', imageUrl);
      } else {
        const imageFile = fs.createReadStream(req.file.path);
        formData.append('file_image', imageFile);
      }

      const response = await axios.post('https://www.picpurify.com/analyse/1.1', formData, {
        headers: formData.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      if (req.file) safeUnlink(req.file.path);

      const result = response.data.porn_moderation || response.data.result || {};
      const pornContentRaw = result.porn_content;
      const pornContent = pornContentRaw === true || pornContentRaw === 'true';
      const confidence = parseFloat(result.confidence_score ?? result.confidence) || 0;

      const classification = classifyPicpurify(pornContent, confidence);
      const nudityDetected = classification !== 'normal';

      return res.json({
        api: 'PicPurify',
        nudity_detected: nudityDetected,
        classification,
        confidence_score: confidence,
        full_response: result,
      });

    } else {
      if (req.file) safeUnlink(req.file.path);
      return res.status(400).json({ error: 'Unknown API selected' });
    }
  } catch (error) {
    if (req.file) safeUnlink(req.file.path);
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: 'Error analyzing image.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

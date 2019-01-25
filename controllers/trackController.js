const Track = require('../db/models/trackModel');

const codeCreated = 201;
const codeBadRequest = 400;
const codeNotFound = 404;
const codeInternalServerError = 500;

const addTrack = async function(req, res) {
  const { body: data } = req;

  if (!data || !data.url) {
    return res.status(codeBadRequest).send({ message: 'Bad Request' });
  }
  try {
    const track = await Track.create(data);

    return res.status(codeCreated).send({ data: track });
  } catch (error) {
    return res.status(codeInternalServerError).send(error);
  }
};

const deleteTrack = async function(req, res) {
  const { params: { id: trackId } } = req;

  if (!trackId) {
    return res.status(codeNotFound).send({ message: 'Bad Request' });
  }
  try {
    await Track.findOneAndRemove({ _id: trackId });

    return res.send({ message: 'Track successfully deleted' });
  } catch (error) {
    return res.status(codeInternalServerError).send(error);
  }
};

const getTracks = async function(req, res) {
  const query = {};

  try {
    const tracks = await Track.find(query);

    return res.send({ data: tracks });
  } catch (error) {
    return res.status(codeInternalServerError).send(error);
  }
};

const updateTrack = async function(req, res) {
  const { body: data, params: { id: trackId } } = req;

  if (!trackId || !data) {
    return res.status(codeBadRequest).send({ message: 'Bad Request' });
  }
  try {
    const track = await Track.findOneAndUpdate({ _id: trackId }, data);

    return res.send({ data: track });
  } catch (error) {
    return res.status(codeInternalServerError).send(error);
  }
};

module.exports = {
  addTrack,
  deleteTrack,
  getTracks,
  updateTrack,
};

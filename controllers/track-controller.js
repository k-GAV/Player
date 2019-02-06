const status = require('http-status');

const Track = require('../db/models/track-model');

const addTrack = async function(req, res) {
  const { body: data } = req;

  if (!data || !data.url) {
    return res.status(status.BAD_REQUEST).send({ message: 'Bad Request' });
  }
  try {
    const track = await Track.create(data);

    return res.status(status.CREATED).send({ data: track });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
};

const deleteTrack = async function(req, res) {
  const { params: { id: trackId } } = req;

  if (!trackId) {
    return res.status(status.NOT_FOUND).send({ message: 'Bad Request' });
  }
  try {
    await Track.findOneAndRemove({ _id: trackId });

    return res.send({ message: 'Track successfully deleted' });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
};

const getTracks = async function(req, res) {
  const query = {};

  try {
    const tracks = await Track.find(query);

    return res.send({ data: tracks });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
};

const updateTrack = async function(req, res) {
  const { body: data, params: { id: trackId } } = req;

  if (!trackId || !data) {
    return res.status(status.BAD_REQUEST).send({ message: 'Bad Request' });
  }
  try {
    const track = await Track.findOneAndUpdate({ _id: trackId }, data);

    return res.send({ data: track });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = {
  addTrack,
  deleteTrack,
  getTracks,
  updateTrack,
};


const Tag = require('../models/tag.model');
const Card = require('../models/card.model');

const tagController = {

  getAllTags: async (req, res) => {
    try {
      const tags = await Tag.find({}).populate('card');
      res.json(tags)
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  createTag: async (req, res) => {
    try {
      const newTag = new Tag({
        name: req.body.name,
        color: req.body.color,
        card: req.body.cardId
      });
      await newTag.save().then(() => {
        res.json({message: 'Tag crée', newTag})
      })
    } catch (error) {
      res.status(500).json(`Impossible de créer le tag`)
      console.trace(error)
    }
  },

  deleteTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      let tag = await Tag.findById(tagId);
      if (!tag) {
        res.status(404).json(`Impossible de trouver le tag avec l'id : ${tagId}`);
      } else {
        await tag.delete();
        res.json('Tag supprimé');
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
  }
  },

}



module.exports = tagController;

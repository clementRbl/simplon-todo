const Card = require('../models/card.model');
const List = require('../models/list.model');


const cardController = {

  getAllCards: async (req, res) => {
    try {
      const cards = await Card.find({}).populate('list', 'name');
      res.json(cards)
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  getOneCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const card = await Card.findById(cardId).populate('list');
      if (card) {
        res.json(card)
      } else {
        res.status(404).json(`Impossible de trouver la carte  avec l'id ${cardId}`)
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }

  },

  createCard: async (req, res) => {

    try {

      const newCard = new Card({
        content: req.body.content,
        color: req.body.color,
        position: req.body.position,
        list: req.body.listId
      });
      await newCard.save().then(() => {
        res.json({message: 'Carte crée', newCard})
      })
    } catch (error) {
      res.status(500).json(`Impossible de créer la carte`)
      console.trace(error)
    }
  },

  editCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const {content, color, position} = req.body;

      let card = await Card.findById(cardId);

      if (content) {
        card.content = content;
      }

      if (color) {
        card.color = color;
      }

      if (position) {
        card.position = position
      }

      await card.save();
      res.json(card)

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  deleteCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      let card = await Card.findById(cardId);
      if (!card) {
        res.status(404).json(`Impossible de trouver la carte avec l'id : ${cardId}`);
      } else {
        await card.delete();
        res.json('carte supprimé');
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
  }
  },

  addCardToList: async (req, res) => {
    try {
    const listId = req.params.id;
    const {cardId} = req.body;

    let list = await List.findById(listId);
    if (cardId) {
      list.cardId = cardId
    }

    await list.save();
    res.status(201).json({message: 'Carte ajouté à la liste', list})
  } catch {
    console.trace(error);
    res.status(500).json(error);
  }

}}



module.exports = cardController;

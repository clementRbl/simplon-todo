const List = require('../models/list.model');

const listController = {

  getAllLists: async (req, res) => {
    try {
      const lists = await List.find({});
      res.json(lists)
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  getOneList: async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await List.findById(listId);
      if (list) {
        res.json(list)
      } else {
        res.status(404).json(`Impossible de trouver la liste  avec l'id ${listId}`)
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }

  },

  createList: async (req, res) => {
    const body = req.body;

    try {
      const newlist = new List(body);
      await newlist.save().then(() => {
        res.json(newlist)
      })
    } catch (error) {
      res.status(500).json(`Impossible de creer la liste`)
      console.trace(error)
    }
  },

  editList: async (req, res) => {
    try {
      const listId = req.params.id;
      const {name, position} = req.body;

      let list = await List.findById(listId);

      if (name) {
        list.name = name;
      }

      if (position) {
        list.position = position;
      }

      await list.save();
      res.json(list)

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  deleteList: async (req, res) => {
    try {
      const listId = req.params.id;
      let list = await List.findById(listId);
      if (!list) {
        res.status(404).json(`Impossible de trouver la liste avec l'id : ${listId}`);
      } else {
        await list.delete();
        res.json('Liste supprimé');
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
  }
  }

}








module.exports = listController;
const router = require('express').Router();
const { model } = require('../../config/connection');
const { Category, Product } = require('../../models');

// /api/categories

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products (include)
  try {
    const dbCategory = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    })
    res.status(200).json(dbCategory)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const dbCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    })
    if (!dbCategory) {
      res.status(404).json({ message: 'error incorrect id' });
      return;
    }
    res.status(200).json(dbCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const dbCategory = await Category.create(req.body);
    res.status(200).json(dbCategory);
  } catch (err) {
    res.status(400).json(err);
  }

});

// problem child
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const dbCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbCategory) {
      res.status(404).json({ message: 'error incorrect id' });
      return;
    }
    res.status(200).json(dbCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

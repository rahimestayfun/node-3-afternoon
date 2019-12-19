module.exports = {
    create: (req, res) => {
        const dbInstance = req.app.get('db');
        const { name, description, price, image_url } = req.body;

        dbInstance.create_product([name, description, price, image_url])
            .then((response) => res.status(200).json(response))
            .catch(error => {
                res.status(500).json({ message: 'Something went wrong.' });
                console.log(error)
            })
    },

    getOne: (req, res) => {
        console.log(req.params.product_id)
        const dbInstance = req.app.get('db');
        const id = +req.params.product_id

        dbInstance.read_product(id)
            .then(product => res.status(200).json(product))
            .catch(error => {
                res.status(500).json({ message: 'Something went wrong.' });
                console.log(error)
            })
    },

    getAll: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_products()
            .then(products => res.status(200).json(products))
            .catch(error => {
                res.status(500).json({ message: "Something went wrong" });
                console.log(error);
            })
    },

    update: (req, res) => {
        const dbInstance = req.app.get('db');
        const id = +req.params.product_id


        dbInstance.update_product([id, req.query.desc])
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(response);
                console.log(error)
            })
    },

    delete: (req, res) => {
        const dbInstance = req.app.get('db');
        const id = +req.params.product_id

        dbInstance.delete_product(id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(response);
                console.log(error)
            })
    }
}
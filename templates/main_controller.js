module.exports = (rogue) => {
    return {
        index: (req, res) => {
            res.json({ Hello : "World"});
        }
    }
};
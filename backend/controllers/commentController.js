const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

// Yorum ekleme
const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.id;
        const recipeId = req.params.recipeId;

        const newComment = new Comment({
            text,
            author: userId,
            recipe: recipeId
        });

        await newComment.save();

        // Yorumu ilgili tarife ekleyelim
        await Recipe.findByIdAndUpdate(recipeId, {
            $push: { comments: newComment._id }
        });

        res.status(201).json({ message: "Yorum eklendi", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Yorum eklenirken hata oluştu", error: error.message });
    }
};

// Tarif için yorumları listele
const getComments = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;

        const comments = await Comment.find({ recipe: recipeId })
            .populate('author', 'username profileImage') // Kullanıcı bilgilerini de çek
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Yorumlar getirilemedi", error: error.message });
    }
};
// Yorum Silme
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Yorum bulunamadı" });

        // Sadece yorumu yazan kişi silebilsin
        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: "Bu yorumu silme yetkiniz yok" });
        }

        await Comment.findByIdAndDelete(commentId);

        // Yorum Recipe'den de silinsin
        await Recipe.findByIdAndUpdate(comment.recipe, {
            $pull: { comments: commentId }
        });

        res.status(200).json({ message: "Yorum başarıyla silindi" });
    } catch (error) {
        res.status(500).json({ message: "Yorum silinirken hata oluştu", error: error.message });
    }
};

// Yorum Güncelleme
const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.id;
        const { text } = req.body;

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Yorum bulunamadı" });

        // Sadece yorumu yazan kişi güncelleyebilsin
        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: "Bu yorumu güncelleme yetkiniz yok" });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json({ message: "Yorum güncellendi", comment });
    } catch (error) {
        res.status(500).json({ message: "Yorum güncellenirken hata oluştu", error: error.message });
    }
};

module.exports = { addComment, getComments, deleteComment, updateComment };



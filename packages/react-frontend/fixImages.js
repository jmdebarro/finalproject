// fixImages.js
db.collection('items').find({}).forEach(function(item) {
    if (item.image && item.image.startsWith('data:image/jpeg;base64,')) {
        db.collection('items').updateOne(
            { _id: item._id },
            { $set: { image: item.image.replace('data:image/jpeg;base64,', '') } }
        );
    }
});

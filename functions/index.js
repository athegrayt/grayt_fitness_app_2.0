const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
    const original = req.query.text
    const writeResult = await admin.firestore().collection('messages').add({original})
    res.json({result: `Message with ID ${writeResult.id} added.`})
})

exports.makeUppercase = functions.firestore.document('messages/{documentId}').onCreate((snap, context) => {
    const original =  snap.data().original
    functions.logger.log('Uppercasing', context.params.documentId, original)
    const uppercase = original.toUpperCase()
    return snap.ref.set({uppercase}, {merge: true})
})
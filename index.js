const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
app.use(cors());

const APP_ID = "3e6cc8398f83416ab70c61a957f5477a";
const APP_CERTIFICATE = "b24e99ae5f05409a842df8889a802313";

app.get('/token', (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ error: "channelName manquant" });
    }
    const uid = 0;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
    res.json({ token: token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur de tokens démarré sur le port ${PORT}`);
});

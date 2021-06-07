# Video API

Req:

```javascript
{
					"roomIdentifier":"sampleRoom103",
					"maxPartipants":2,
                    "type":"go"
}
```

Res:

```javascript
{
    "status": {
        "success": true
    },
    "data": {
        "channel": {
            "sid": "RMd6b51c634c11974839a14bceb6c54894",
            "status": "in-progress",
            "dateCreated": "2020-11-17T15:49:15.000Z",
            "dateUpdated": "2020-11-17T15:49:15.000Z",
            "accountSid": "AC4a26362b3f0f346746869999edaed718",
            "enableTurn": true,
            "uniqueName": "org-20-sampleRoom103",
            "statusCallback": null,
            "statusCallbackMethod": "POST",
            "endTime": null,
            "duration": null,
            "type": "go",
            "maxParticipants": 2,
            "recordParticipantsOnConnect": false,
            "videoCodecs": null,
            "mediaRegion": null,
            "url": "https://video.twilio.com/v1/Rooms/RMd6b51c634c11974839a14bceb6c54894",
            "links": {
                "recordings": "https://video.twilio.com/v1/Rooms/RMd6b51c634c11974839a14bceb6c54894/Recordings",
                "participants": "https://video.twilio.com/v1/Rooms/RMd6b51c634c11974839a14bceb6c54894/Participants",
                "recording_rules": "https://video.twilio.com/v1/Rooms/RMd6b51c634c11974839a14bceb6c54894/RecordingRules"
            }
        }
    }
}
```

Type attribute is optional in request if it is not provided then default is
"group". Four types of rooms can be created they are:

go(max participants can be two), peer-to-peer, group-small and group.

require('dotenv').config()
const axios = require('axios');
const querystring = require('querystring');



exports.top_posts = function (req, res) {
    let url = 'https://www.reddit.com/api/v1/access_token';
    let params = {
        device_id: 'DO_NOT_TRACK_THIS_DEVICE',
        grant_type: 'https://oauth.reddit.com/grants/installed_client'
    };
    let config = { headers: { 'authorization': 'Basic '+process.env.ENCODED_APP_KEY } };

    axios.post(url, querystring.stringify(params), config)
        .then(resp => {
            let token = resp.data.access_token
            return token;
        })
        .then(token => {
            let url = 'https://oauth.reddit.com/r/'+req.params.subreddit+'/top.json?&t='+req.params.timeperiod+'&limit='+req.params.count,
                config = { headers: { 'Authorization': 'bearer ' + token } };

            return axios.get(url, config);
        })
        .then(resp => {
          //  console.log("wokred? ");
            res.json(resp.data.data.children);
        })
        .catch(err => { console.log("error") });
}
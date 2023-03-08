   const {json} = require("body-parser");
   var request = require("request");

   var options ={method: 'POST',
   url:'https://dev-0qdak8w3j46gzknx.us.auth0.com/api/v2/users',
   headers: {
    'content-type': 'application/json',
    'Authorization': "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBteHphLUd1R0RQeGFJbTdGeTRaNCJ9.eyJpc3MiOiJodHRwczovL2Rldi0wcWRhazh3M2o0Nmd6a254LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiIzdE5hYkQxSTgxZVEwUlllNVFqUm8yY0tQRnhhRmZBTUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtMHFkYWs4dzNqNDZnemtueC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3NzUzNjYzMSwiZXhwIjoxNjc3NjIzMDMxLCJhenAiOiIzdE5hYkQxSTgxZVEwUlllNVFqUm8yY0tQRnhhRmZBTSIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.nLoPsIOVPfkRcwudAR_4mYOysNcfk79XHHbYfkdOaP_f5IqG1eApCNuhb-kTgWk8dt_CJJiEun93PmNk_wJ_t1QxgUYrjbcBex2RuJALA5jjU-dKkb07WWpk-GGjyedpexKHoLYWpFKQPGxjW6T4X5dmwzH8jJY7nzVq4oSVHIThe3x1GwDlutn9SQNLNcIgZo1I8IYHi03LsfaQmEbbw6Z9tGK7sIhMcmuBjWeK7Fj5ua6FAoohBJxZgr1NUcwDWGJGGROTvIzBNJg33CTHNhA0BufGAtt7zwTMJ-aL50DQm88MZFkQCRqD2plhQBGGt3m8go3pNvoPymmLA_hkHw"
   },
   body: JSON.stringify({
  "email": "zabimary12@gmail.com",
  "phone_number": "+199999999999999",
  "user_metadata": {},
  "blocked": false,
  "email_verified": false,
  "phone_verified": false,
  "app_metadata": {},
  "given_name": "Ivan",
  "family_name": "Shmorhunenko",
  "name": "Ivan Shmorhunenko",
  "nickname": "zabimary12",
  "picture": "https://secure.gravatar.com/avatar/15626c5e0c749cb912f9d1ad48dba440?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
  "user_id": "1",
  "connection": "Initial-Connection",
  "password": "secret322",
  "verify_email": false,
  "username": "zabimary12"
}) };

   request(options, function (error, response, body){
    if(error) throw new Error(error);

    console.log(body);
   })
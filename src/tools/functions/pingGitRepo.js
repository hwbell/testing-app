// /repos/:owner/:repo/stats/participation
// a83b6cb793cf1555c384d6e6dabdf760f0a53bcf

const fetch = require('node-fetch');
const token = 'a83b6cb793cf1555c384d6e6dabdf760f0a53bcf';
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const serverUrl = 'https://api.github.com';

var moment = require('moment');
moment().format();

const transformRepoData = (data) => {
  // 86400000 is one day in milliseconds
  // use this to increment over the days in the weekly breakdown from github
  // Example weekly data from github - returns array of last 52 weeks, each week looks like below
  // {
  //   total: 0, - total commits
  //   week: 1588464000, - unix timestamp of start of week (Sun 12:00am)
  //   days: [
  //     0, 0, 0, 0, 0, 0, 0 - each day's commit count
  //   ]
  // }

  let transform = []

  data.forEach((obj) => {

    console.log(obj.commit.author.date.slice(0, 10))
    transform.push({
      date: obj.commit.author.date.slice(0, 10),
      count: 1
    })

    // // to work with the past year api data, week by week
    // obj.days.forEach((day, i) => {
    //   // let date = moment(obj.week * 1000 + (i * 86400000)).format();
    //   // transform.push({
    //   //   date: date.slice(0,10),
    //   //   count: obj.days[i]
    //   // })

    // });

  });
  return transform;
}
export default async function getRepoInfo(repo) {
  let serverResponse = await fetch(`${serverUrl}/repos/hwbell/${repo}/commits`, {
    method: 'GET',
    headers
  })
    .then(response => response.json())
    .then((json) => {
      console.log(json)
      return transformRepoData(json);
    })
    .catch(err => console.log(err))

  return serverResponse;
}

// getUserInfo(headers)
//   .then((data) => {
//     console.log(data.length);

//     let values = transformRepoData(data);
//     console.log(values);
//     console.log(values.length)

//   })
//   .catch(e => console.log(e))
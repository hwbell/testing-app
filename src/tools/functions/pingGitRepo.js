// /repos/:owner/:repo/stats/participation
// a83b6cb793cf1555c384d6e6dabdf760f0a53bcf

const fetch = require('node-fetch');
const token = process.env.REACT_APP_GIT_TOKEN;
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

  // use this instead of i, since if we find the same date we won't increment
  let ind = 0;
  
  data.forEach((obj) => {
    // // to work with the past year api data, week by week
    // obj.days.forEach((day, i) => {
    //   // let date = moment(obj.week * 1000 + (i * 86400000)).format();
    //   // transform.push({
    //   //   date: date.slice(0,10),
    //   //   count: obj.days[i]
    //   // })

    // });
    // console.log(obj.commit.author.date.slice(0, 10))

    // to work with the full commits list


    if (ind > 0) {
      if (obj.commit.author.date.slice(0, 10) == data[ind - 1].commit.author.date.slice(0, 10)) {
        console.log(transform)
        console.log(ind)
        transform[ind - 1].count++;
      } else {
        transform.push({
          date: obj.commit.author.date.slice(0, 10),
          count: 1
        });
        ind++;
      }
    } else {
      transform.push({
        date: obj.commit.author.date.slice(0, 10),
        count: 1
      });
      ind++
    }
   
  });
  return transform;
}
export default async function getRepoInfo(repo) {
  let serverResponse;

  if (localStorage.getItem(repo) == "undefined" || localStorage.getItem(repo) == null) {
    serverResponse = await fetch(`${serverUrl}/repos/hwbell/${repo}/commits`, {
      method: 'GET',
      // headers
    })
      .then(response => response.json())
      .then((json) => {
        console.log('from API:')
        console.log(json)
        return transformRepoData(json);
      })
      .catch(err => console.log(err))

    localStorage.setItem(`${repo}`, JSON.stringify(serverResponse));
  }
  else {
    console.log(`getting ${repo} info from local storage:`)
    serverResponse = JSON.parse(localStorage.getItem(repo));
  }

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
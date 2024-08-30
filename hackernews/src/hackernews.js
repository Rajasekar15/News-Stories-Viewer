import React from "react";
import PageLoader from "./PageLoader";
import Pagination from "./Pagination";
import {Heading,ShowUnreadButton,SubmitButton,NewStoriesDiv,PaginationDiv} from './styles';

export default class Hackernews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topStoriesKey: [],
      hackerNewsDetails: [],
      showLoader: false,
      hackernewsDetailsDiff: [],
      newStoriesCount: 0,
      filterReadClicked: false,
      unreadStories: [],
      sortBy: "",
      currentPage: 1,
      recordsPerPage: 10,
    };
  }
  setTopStoriesKey = (arr = []) => {
    this.setState({ topStoriesKey: arr });
  };
  showLoaderFunc = (flag = false) => {
    this.setState({ showLoader: flag });
  };
  topStoriesArrayAfterPollFunc = (savedArray = [], newArray = []) => {
    let result = [];
    newArray.map((item) => {
      if (!savedArray.includes(item)) {
        result.push(item);
      }
    });
    return result;
  };
  hackernewsDetailsDiffFunc = (arr = []) => {
    this.setState({ hackernewsDetailsDiff: arr });
    this.setState({ newStoriesCount: arr.length });
  };
  topStoriesArray = async function () {
    try {
      this.showLoaderFunc(true);
      const { topStoriesKey = [] } = this.state;
      let topStoriesAPI = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );
      let topStoriesPromise = new Promise((resolve, reject) => {
        if (topStoriesAPI.status == 200) {
          resolve(topStoriesAPI.json());
        } else {
          reject(topStoriesAPI.status);
        }
      });
      topStoriesPromise
        .then((data) => {
          const topStoriesArrayDiffAfterPoll =
            this.topStoriesArrayAfterPollFunc(topStoriesKey, data.slice(0, 20));
          this.hackernewsDetailsDiffFunc(topStoriesArrayDiffAfterPoll);
          return topStoriesArrayDiffAfterPoll;
        })
        .then((data) => {
          const topStoriesArrayAfterPoll = [...data, ...topStoriesKey];
          this.setTopStoriesKey(topStoriesArrayAfterPoll);
        })
        .catch((err) => {
          alert("API ERROR catch topstories.json");
          console.log(err);
        });
    } catch (error) {
      alert("API ERROR topstories.json");
      console.log("Error while loading topstories.json", error);
    }
  };
  hackerNewsArrayFunc = (arr = []) => {
    this.setState(
      {
        hackerNewsDetails: [...arr,...this.state.hackerNewsDetails],
      },
      () => {
        this.sortElements();
      }
    );
  };
  topStoriesJson = (arr = [], successCb = () => {}) => {
    try {
      if (arr && arr.length) {
        let hackerArray = [];
        let requests = arr.map((id) => {
          return new Promise(async (resolve, reject) => {
            let topStoriesJsonAPI = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
            );
            if (topStoriesJsonAPI.status == 200) {
              resolve(topStoriesJsonAPI.json());
            } else {
              reject(topStoriesJsonAPI.status);
            }
          });
        });
        Promise.all(requests)
          .then((body) => {
            body.forEach((res) => {
              if (res) hackerArray.push(res);
            });
            return hackerArray;
          })
          .then((data) => {
            this.hackerNewsArrayFunc(data);
            successCb();
          })
          .catch((err) => {
            alert("API ERROR hackerItems API");
            console.log("Error while Fetching hackerItems API", err);
          });
      } else {
        successCb();
      }
    } catch (error) {
      alert("API ERROR hackerItems API");
      console.error("Error while loading hackerItems API", error);
    }
  };
  didmountFunc = () => {
    this.topStoriesArray();
  };
  componentDidMount() {
    this.didmountFunc();
    setInterval(() => this.didmountFunc(), 30000);
  }
  componentDidUpdate(prevProps, prevState) {
    const { hackernewsDetailsDiff = [], filterReadClicked = false } =
      this.state;
    if (hackernewsDetailsDiff != prevState.hackernewsDetailsDiff) {
      this.topStoriesJson(hackernewsDetailsDiff, () =>
        this.showLoaderFunc(false)
      );
    }
    if (filterReadClicked != prevState.filterReadClicked && filterReadClicked) {
      this.filterunreadArray();
    }
  }
  checkBoxClickFunc = (id = "") => {
    const { hackerNewsDetails = [] } = this.state;
    hackerNewsDetails.map((item = {}) => {
      if (item.id == id) {
        if (!item.read) {
          item["read"] = true;
        } else {
          item["read"] = false;
        }
      }
    });
  };
  filterunreadArray = () => {
    const { hackerNewsDetails = [] } = this.state;
    let unreadArray = [];
    hackerNewsDetails.map((item) => {
      if (!item.read) {
        unreadArray.push(item);
      }
    });
    this.setState({ unreadStories: unreadArray });
  };
  filterReadClick = () => {
    this.setState({ filterReadClicked: !this.state.filterReadClicked });
  };
  displayRadioValue = () => {
    let ele = document.getElementsByName("sort");

    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked)
        this.setState({ sortBy: ele[i].value }, () => {
          this.sortElements();
        });
    }
  };
  sortElements = () => {
    const { sortBy = "", hackerNewsDetails = [] } = this.state;
    if (!sortBy) {
      return;
    }
    if (sortBy == "score") {
      hackerNewsDetails.sort(function (a, b) {
        return a[`${sortBy}`] - b[`${sortBy}`];
      });
    } else {
      hackerNewsDetails.sort((a, b) => {
        let fa = a[`${sortBy}`].toLowerCase(),
          fb = b[`${sortBy}`].toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({ hackerNewsDetails: hackerNewsDetails });
  };
  setCurrentPage = (data) =>{
    this.setState({currentPage:data});
  }
  render() {
    const {
      showLoader = false,
      hackerNewsDetails = [],
      unreadStories = [],
      filterReadClicked = false,
      recordsPerPage = 5,
      currentPage = 1,
      newStoriesCount=0,
      hackernewsDetailsDiff=[]
    } = this.state;
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const displayStories =
      filterReadClicked && unreadStories.length //If user has read all stories then i will show every stories
        ? unreadStories
        : hackerNewsDetails;
    const currentRecords = displayStories.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    const nPages = Math.ceil(displayStories.length / recordsPerPage)
    return (
      <div>
        <Heading>HACKER NEWS STORIES VIEWER</Heading>
        {showLoader ? (
          <PageLoader />
        ) : (
          <div>
            <div>
              <div>
              <b><span>SORT BY:</span></b>
              <input type="radio" name="sort" value="score"/>
              Score
              <input type="radio" name="sort" value="title" />
              Title
              <input type="radio" name="sort" value="by" />
              Author
              <SubmitButton type="button" onClick={() => this.displayRadioValue()}>
                Submit
              </SubmitButton>
              </div>
              <div>
              <b><span>To See  {filterReadClicked ? "All" : "UnRead"} list:</span></b>
              <ShowUnreadButton
                className="FilterRead"
                onClick={() => this.filterReadClick()}
              >
               Click Me!
              </ShowUnreadButton>
              </div>

            </div>
            <b><NewStoriesDiv>Number of new stories since the last poll:{newStoriesCount!=20?newStoriesCount:0}</NewStoriesDiv></b>
            <table border= "1 solid black">
              <th>S.No</th>
              <th>Read/Unread</th>
              <th>SCORE</th>
              <th>TITLE</th>
              <th>URL</th>
              <th>AUTHOR</th>
              {currentRecords.map((item = {}, index) => {
                const recentlyAdded = () =>{
                  if(!hackerNewsDetails.length || hackerNewsDetails.length==20){
                    return false;
                  }
                  return hackernewsDetailsDiff.includes(item.id);
                }
                return (
                  <tbody style={{ backgroundColor: recentlyAdded() ?'#00FA9A': '#FFFFE0' }}>
                    <td>{index + 1}.</td>
                    <td>
                      <input
                        type="checkbox"
                        className="check"
                        key={index}
                        checked={item.read}
                        onClick={() => this.checkBoxClickFunc(item.id)}
                      ></input>
                    </td>
                    <td>{item.score}</td>
                    <td>{item.title}</td>
                    <td>{item.url}</td>
                    <td>{item.by}</td>
                  </tbody>
                );
              })}
            </table>
            <PaginationDiv>
            <Pagination 
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={(data)=>this.setCurrentPage(data)}/>
            </PaginationDiv>
          </div>
        )}

      </div>
    );
  }
}

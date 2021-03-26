// import React, {Component} from 'react';
// import 'whatwg-fetch'
// import cookie from 'react-cookies'
// import DataInline from './DataInline'
// import Button from 'react-bootstrap/Button';
// import {Link} from 'react-router-dom'
// import Moment from "react-moment";

// class dataView extends Component {

//     constructor(props) {
//         super(props);
//         this.toggleDataListClass = this.toggleDataListClass.bind(this);
//         this.handleNewData = this.handleNewData.bind(this);
//         this.loadMoreData = this.loadMoreData.bind(this);
//         this.state = {
//             stateMetrics: null,
//             stateName: null,
//             stateCode: null,
//             allianceMember: null,
//             dataListClass: "card",
//             staff: null,
//             previous: null,
//             author: false,
//             draft: null,
//             count: 0
//         }
//     }

//     loadMoreData() {
//         const {next} = this.state;
//         if (next !== null || true) {
//             this.loadData(next)
//         }

//     }

//     loadData(nextEndpoint) {
//         if (this.state.stateName == null) {
//             const thisProps = this.props.location;
//             const pathArray = thisProps.pathname.split('/');
//             this.state.stateName = pathArray[2]
//         }
//         let endpoint = `/api/metrics/${this.state.stateName}`;
//         if (nextEndpoint !== undefined) {
//             endpoint = nextEndpoint
//         }
//         let thisComp = this;
//         let lookupOptions = {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };
//         const csrfToken = cookie.load('csrftoken');
//         if (csrfToken !== undefined) {
//             lookupOptions['credentials'] = 'include';
//             lookupOptions['headers']['X-CSRFToken'] = csrfToken
//         }

//         fetch(endpoint, lookupOptions)
//             .then(function (response) {
//                 return response.json()
//             }).then(function (responseData) {
//                 thisComp.setState({
//                     stateMetrics: responseData.state_metrics,
//                     stateName: responseData.state_name,
//                     stateCode: responseData.state_code,
//                     allianceMember: responseData.us_climate_alliance,
//                     next: responseData.next,
//                     previous: responseData.previous,
//                     staff: responseData.staff,
//                     draft: responseData.draft,
//                     count: responseData.count,
//                     doneLoading: true,
//                 })
//             }
//         ).catch(function (error) {
//             console.log("error", error)
//         })
//     }

//     handleData(responseData) {
//         let data = responseData.filter(data => data.draft === false);
//         this.setState({
//             dataPublic: data
//         })
//     }

//     handleNewData(commItemData) {
//         let currentData = this.state.data;
//         currentData.unshift(commItemData); // unshift
//         this.setState({
//             data: currentData
//         })
//     }

//     toggleDataListClass(event) {
//         event.preventDefault();
//         let currentListClass = this.state.dataListClass;
//         if (currentListClass === "") {
//             this.setState({
//                 dataListClass: "card",
//             })
//         } else {
//             this.setState({
//                 dataListClass: "",
//             })
//         }

//     }

//     componentDidMount() {
//         if (this.props.location.state !== undefined) {
//             this.stateComp = this.props.location.state;
//             this.setState({
//                 stateMetrics: this.stateComp.stateMetrics,
//                 stateName: this.stateComp.stateName,
//                 stateCode: this.stateComp.stateCode,
//                 allianceMember: this.stateComp.allianceMember,
//                 staff: this.stateComp.staff,
//                 dataListClass: "card",
//                 next: null,
//                 previous: null,
//                 // author: true,
//                 count: 0
//             })
//         } else {
//             this.setState({
//                 dataListClass: "card",
//                 next: null,
//                 previous: null,
//                 count: 0
//             });
//             this.loadData()
//         }
//     }

//     upperFirstLetter(string) {
//         // Utility function for upper casing first letters (ex. virginia => Virginia)
//         if (typeof string === undefined) return;
//         const firstLetter = string[0] || string.charAt(0);
//         return firstLetter ? firstLetter.toUpperCase() + string.slice(1) : '';
//     }

//     render() {
//         const {stateMetrics} = this.state;
//         const {stateName} = this.state;
//         const {stateCode} = this.state;
//         const {allianceMember} = this.state;
//         const {dataListClass} = this.state;
//         const {staff} = this.state;
//         const {next} = this.state;
//         return (
//             <div className="container-fluid">
//                 <h1>
//                     {staff === true ? <Link className='mr-2'
//                                             maintainScrollPosition={false}
//                                             to={{
//                                                 pathname: `/portal/${stateName}/data/create/`,
//                                                 state: {status: 'create',
//                                                         data: '',
//                                                         stateName: '',
//                                                         staff: {staff},
//                                                         readOnly: '',}
//                                             }}><Button variant="outline-dark"
//                                                        type="button">Create New Record</Button>
//                     </Link> : ""}
//                     <Button onClick={this.toggleDataListClass}>List View</Button>
//                 </h1>
//                 <br/>
//                 {staff === true ?
//                     <div>
//                         <h1>{this.upperFirstLetter(stateName)} Records</h1>
//                         {stateMetrics.length > 0 ? stateMetrics.map((dataItem, index) => {
//                             return (
//                                 <DataInline data={dataItem}
//                                             stateName={stateName}
//                                             stateCode={stateCode}
//                                             allianceMember={allianceMember}
//                                             staff={staff}
//                                             elClass={dataListClass}
//                                             readOnly={true} />
//                             )
//                         }) : <p>No data Found</p>
//                         }
//                     </div>
//                     : ""}
//                 <div className="d-flex flex-column text-center">
//                     {next !== null ? <Button
//                         variant="outline-dark"
//                         onClick={this.loadMoreData}>Load
//                         more</Button> : ''}
//                 </div>
//                 <br/>
//             </div>
//         );
//     }
// }

// export default dataView;

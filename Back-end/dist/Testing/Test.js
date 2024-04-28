"use strict";
const getDetails = async (url, headers, body, filters = {}) => {
    const response = await fetch(url, {
        headers,
        body,
        method: "POST"
    });
    const details = await response.json();
    let busDetails = details['inventories'];
    busDetails = busDetails.filter((bus) => {
        for (let key in filters) {
            if (key === 'totalRatings') {
                if (bus[key] < filters[key]) {
                    return false;
                }
            }
            else if (key === 'MaxRate') {
                if (bus['fareList'][0] > filters[key]) {
                    return false;
                }
            }
            else if (key === '') { }
            else if (bus[key] !== filters[key]) {
                return false;
            }
        }
        return true;
    });
    return busDetails;
};
async function main() {
    const url = "https://www.redbus.in/search/SearchV4Results?fromCity=122&toCity=124&DOJ=25-Apr-2024";
    const headers = {
        "accept": "application/json, text/plain, */*",
        "content-type": "application/json",
    };
    const body = "{\"onlyShow\":[],\"dt\":[],\"SeaterType\":[],\"AcType\":[],\"travelsList\":[],\"amtList\":[],\"bpList\":[],\"dpList\":[],\"CampaignFilter\":[],\"rtcBusTypeList\":[],\"at\":[],\"persuasionList\":[],\"bpIdentifier\":[],\"bcf\":[],\"opBusTypeFilterList\":[]}";
    const filters = {
        isSleeper: true,
        isAc: true,
        totalRatings: 4.0,
        MaxRate: 1500
    };
    const details = await getDetails(url, headers, body, filters);
    // const codes : any = {};
    // for(let i = 0; i < 1000; i++){
    //     let tempUrl = `https://www.redbus.in/search/SearchV4Results?fromCity=0&toCity=${i}&DOJ=25-Apr-2024`
    //     const response = await fetch(tempUrl, {
    //         headers,
    //         body,
    //         method: "POST"
    //     });
    //     const details = await response.json();
    //     if (details.parentDstCityName !== null)
    //         codes[i] = details.parentDstCityName;
    // }
    console.log(details);
}
main();

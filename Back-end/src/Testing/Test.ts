const getDetails = async (url : string , headers : any, body : string, filters : any = {}) => {
    const response = await fetch(url, {
        headers, 
        body, 
        method: "POST"
    });
    const details = await response.json();
    let busDetails = details['inventories'];

    busDetails = busDetails.filter((bus : any) => {
        for(let key in filters) {
            if (bus[key] !== filters[key]) {
                return false;
            }
        }
        return true;
    })
    return busDetails;
}

async function main() {
    const url : string = "https://www.redbus.in/search/SearchV4Results?fromCity=0&toCity=0&DOJ=25-Apr-2024"

    const headers : any = {
        "accept": "application/json, text/plain, */*",
        "content-type": "application/json",
      }

    const body : string = "{\"onlyShow\":[],\"dt\":[],\"SeaterType\":[],\"AcType\":[],\"travelsList\":[],\"amtList\":[],\"bpList\":[],\"dpList\":[],\"CampaignFilter\":[],\"rtcBusTypeList\":[],\"at\":[],\"persuasionList\":[],\"bpIdentifier\":[],\"bcf\":[],\"opBusTypeFilterList\":[]}"

    const filters = {
        isSleeper : true,
        isAc : true,
    }
    // const details = await getDetails(url, headers, body, filters);
    const codes : any = {};
    for(let i = 0; i < 1000; i++){
        let tempUrl = `https://www.redbus.in/search/SearchV4Results?fromCity=0&toCity=${i}&DOJ=25-Apr-2024`
        const response = await fetch(tempUrl, {
            headers,
            body,
            method: "POST"
        });

        const details = await response.json();
        if (details.parentDstCityName !== null)
            codes[i] = details.parentDstCityName;
    }
    console.log(codes);
}


main()
const ALPHA_VANTAGE_API_KEY = 'FD67P87KL5R1VBB6'

export const fetchStockData = (name, type) => {
    return fetch(
        `https://www.alphavantage.co/query?function=${type}&symbol=${name}&interval=1min&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`
    ).then(res => res.json())
}

export const transformData = (data) => {
    const timeSeries = data[Object.keys(data)[1]];
    const result = Object.keys(timeSeries).map((item, pos) => {
        const timeStamp = new Date(item).getTime();
        console.log(timeStamp)
        const obj = Object.keys(timeSeries[item]);
        // return {
        //     time: item,
        //     data: [timeStamp, Number(timeSeries[item][obj[0]]), Number(timeSeries[item][obj[1]]), Number(timeSeries[item][obj[2]]), Number(timeSeries[item][obj[3]])]
        // }
        return [timeStamp, Number(timeSeries[item][obj[0]]), Number(timeSeries[item][obj[1]]), Number(timeSeries[item][obj[2]]), Number(timeSeries[item][obj[3]])]
    });
    return result;
}

export const fetchData = () => {
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=tesla&region=US", {
        method: "GET",
        headers: {
            "x-rapidapi-key": "68eff3829fmsh3dc7e8e6b2a1dbap1d9a4cjsn249ae24939ac",
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.error(err);
        });
}

export const fetchDemo = () => {
    return fetch(
        `https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json`
    ).then(res => res.json())
}
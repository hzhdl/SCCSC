const XLSX = require('xlsx')// 别问为啥要这样，因为不这样会报错，原因暂时不懂，如果知道麻烦也告诉我一声哈


const exportByExcel = async (jsonData, header,name) => {
    let arrAll = [];
    jsonData.forEach(item => {
        let arr = [];
        header.forEach(item1 => {
            let singleData = ''
            for (let i in item) {
                if (item1 === i) {
                }else{
                    singleData = item[item1]
                }
            }
            arr.push(singleData);
        });
        arrAll.push(arr);
    });
    const workbook = XLSX.utils.book_new();

    const worksheetName = "SheetJS";
    const worksheetData = [header, ...arrAll];
    // Converts an array of arrays of JS data to a worksheet.
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);

    // At this point, out.xls will have been downloaded.
    // Output format determined by filename
    XLSX.writeFile(workbook, name+".xls");
};

module.exports = {exportByExcel}

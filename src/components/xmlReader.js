import XMLParser from 'react-xml-parser';



/*
  Company name = X
Company Number = Y
address_line_1 = Z
   */
export default function CompanyDetails(props) {
    // const itemIdExample = '<![CDATA[78032]]>';
    // https://regex101.com/
    //const regexItemId = 'd+';  // not strict regular expression format should be \d+
    //const regexDisplayVal = '/(<!\\[CDATA\\[)(.+)(\\]\\]>)/';

    //let x = regexItemId.exec(itemIdExample);
    //let dis = regexDisplayVal.exec(itemIdExample);
//<table id="companyDetails"></table>

    let jsonDataFromXml = new XMLParser().parseFromString(props.xmlDoc);


    //console.log('--xmlDOC---', jsonDataFromXml);
    //xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    let data = jsonDataFromXml.getElementsByTagName('view');
    //console.log('---DATA---', data[0].getElementsByTagName('view')[0].getElementsByTagName('data')[0].getElementsByTagName('item'));
    let items = data[0].getElementsByTagName('view')[0].getElementsByTagName('data')[0].getElementsByTagName('item');

    let companyTable = items.map((xml) => {
        //console.log('--item data---', xml);
        let rawId = xml.getElementsByTagName("itemID");
        let columns = xml.getElementsByTagName("column");
        // Can get away with map as values wanted are in order in the xml doc
        let tableRowContents = columns.map((column) => { // join used to remove undefined
            /*
            position="1" - company name should be in position 1
            columnid="48162" - column ID used to confirm
           <column position="1" columnid="48162">
                    <rawData><![CDATA[ACME 1]]></rawData>
                    <displayData><![CDATA[ACME 1]]></displayData>
                </column>

             */
            //console.log('--column--', column);
            //console.log('--test--',column['attributes']["position"]);
            let position = column['attributes']["position"];
            let colId = column['attributes']["columnid"];

            if((position ==='1' && colId === '48162') || (position === '2' && colId === '48137')
                || (position ==='3' && colId === '48138')) {
                //let displayValRegRes = regexDisplayVal.exec(column['children'][1].getElementsByTagName("value"));
                //return `<td>${displayValRegRes[1]}</td>`;
                let displayValRegRes = column['children'][1]['value'].replace(' >',''); // getElementsByTagName("displayData");
                //console.log('--value--',displayValRegRes);
                return (<td id={displayValRegRes}>{displayValRegRes}</td>);
            }
            return undefined;
        });
        return (<tr id={rawId}>{tableRowContents}</tr>);
    });

    // Print the xml data in table form
    return (<div> <table><thead><tr><th>Company Name</th><th>Company Number</th><th>Address</th></tr></thead>
        <tbody>{companyTable}</tbody></table></div>);
}



var app = angular.module("ExcelApp",[])

app.controller("ExcelController", function($scope,$http){
    $http.get('js/data.json').then(function(response){
        $scope.jsondata = response.data;
       // alert(JSON.stringify($scope.jsondata));
    });

    function JSONToCSVConverter(JSONData, ReportTitle,  ShowLabel){
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData):JSONData;
        var CSV = '';

        CSV += ReportTitle +'\r\n\n';

        if(ShowLabel){
            var row = "";

            for(var index in arrData[0]){
                row += index + ',';
            }
            row = row.slice(0,-1);
            CSV += row + '\r\n';
        }
        for(var i=0; i < arrData.length;i++) {
            var row = "";

        for(var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length-1);
        CSV += row + '\r\n';
        }
        if(CSV == '') {
            alert("Invalid Data");
            return;
        }
        var fileName = "MyReport_";
        fileName += ReportTitle.replace(/ /g,"_");

        var uri = 'data:text/csv; charset = utf-8,' + escape(CSV);

        var link = document.createElement("a");
        link.href = uri; 

        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  
    }
    $scope.createcsv = function()
    {
       //  alert("hello");
       JSONToCSVConverter($scope.jsondata,'MyReport',true);
    }
}); 

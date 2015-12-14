﻿var datatable = null;
var db = openDatabase("MyData", "", "My Database", 1024 * 100);
function init() {
    datatable = document.getElementById("datatable");
    showAllData();
}

//删除所有数据
function removeAllData() {
    for (var i = datatable.childNodes.length - 1; i >= 0; i--) {
        datatable.removeChild(datatable.childNodes[i]);
    }
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    th1.innerHTML = "姓名";
    th2.innerHTML = "留言";
    th3.innerHTML = "时间";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    datatable.appendChild(tr);
}

//显示数据
function showData(row) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = row.name;
    var td2 = document.createElement("td");
    td2.innerHTML = row.message;
    var td3 = document.createElement("td");
    var t = new Date();
    t.setTime(row.time);
    td3.innerHTML = t.toLocaleDateString() + " " + t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    datatable.appendChild(tr);
}

//显示所有数据
function showAllData() {
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT, time INTEGER)", []);
        tx.executeSql("SELECT * FROM MsgData", [], function (tx, rs) {
            removeAllData();
            for (var i = 0; i < rs.rows.length; i++) {
                showData(rs.rows.item(i));
            }
        });
    });
}

//添加数据
function addData(name, message, time) {
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO MsgData VALUES(?,?,?)", [name, message, time], function () {
            alert("成功");
        }, function (tx, error) {
            alert(error.source + ":" + error.message);
        });
    });
}

//保存数据
function saveData() {
    var name = document.getElementById("name").value;
    var memo = document.getElementById("memo").value;
    var time = new Date().getTime();
    addData(name, memo, time);
    showAllData();
}
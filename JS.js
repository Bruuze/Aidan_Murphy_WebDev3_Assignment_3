/*--- Main Variables ---*/

    var assignments = [];
    
    var theAssignments ={};

    var reverseSortModule = 0;
	var reverseSortId = 0;
	var reverseSortDesc = 0;
	var reverseSortHours = 0;
	var reverseSortDate = 0;
    
    var menuOn = true;

	/*--- Refreshes Table ---*/

    function refreshTable() {

		/*--- Removes All Current Table Items ---*/

        var myTable = document.getElementById("parent-insert");
        for(var i = 1;i<myTable.rows.length;){
            myTable.deleteRow(i);
        }

		/*--- Adds all Project to the Table ---*/

        for(var i = 0; i < assignments.length; i++){

            var myTableRow = document.createElement("tr");

			/*--- Adds all table cells into a table row ---*/

            for (const prop in assignments[i]) {

                var theItem = document.createElement("td");
                theItem.innerHTML = assignments[i][prop];
                myTableRow.appendChild(theItem);
            }

			/*--- Adds Delete Button on each table row ---*/

            var theDelete = document.createElement("button");
            theDelete.innerHTML = "Delete";
            theDelete.setAttribute("value",i);
            theDelete.setAttribute("onclick","deleteRow(this)");
            myTableRow.appendChild(theDelete);

            myTable.appendChild(myTableRow);

        }
        
        theAssignments = assignments;
        window.localStorage.setItem("aO",JSON.stringify(theAssignments));

    }

	/*--- Delete Specified Row ---*/

    function deleteRow(rowValue) {

		assignments.splice(rowValue.value, 1);
        refreshTable()

    }

	/*--------- "Click" Events ---------*/

    window.onload = function(){
        
        if(window.localStorage.getItem("aO")== null){
            
            theAssignments = assignments;
            window.localStorage.setItem("aO",JSON.stringify(theAssignments));
            
        }
        
        theAssignments = JSON.parse(window.localStorage.getItem("aO"));

        theAssignments.toArray;
        assignments = theAssignments;
        refreshTable()
        

		/*--- Event Listeners ---*/

        document.getElementById("th-module-sort").addEventListener("click", sortModule);
        document.getElementById("th-pro-desc-sort").addEventListener("click", sortDesc);
        document.getElementById("th-total-hours-sort").addEventListener("click", sortHours);
        document.getElementById("th-due-sort").addEventListener("click", sortDate);
        document.getElementById("hamburger-menu").addEventListener("click", showMenu);
        document.getElementById("close-menu").addEventListener("click", hideMenu);

        document.getElementById("submit-btn").addEventListener("click", function(){

            /*--- Event Handlers ---*/

            var moduleOfProject = document.getElementById("form-module-name").value;
            var projectId = Math.floor(Math.random() * 100);
            var projectDesc = document.getElementById("form-project-description").value;
            var totalHours = document.getElementById("form-total-hours").value;
            var dueDate = document.getElementById("form-due-date").value;

			/*--- Adds a Project to the Array "Assignments" ---*/

            var formData = {module: moduleOfProject, projid: projectId, projdesc: projectDesc, thours: totalHours, due: dueDate };

            if(moduleOfProject == "" || projectId == "" || projectDesc == "" || totalHours == "" || dueDate == ""){

                alert("Please make sure you enter in a full project!");

			}

			else {

                assignments.push(formData);
                refreshTable()

                document.getElementById("form-module-name").value = "";
                document.getElementById("form-project-description").value = "";
                document.getElementById("form-total-hours").value = "";
                document.getElementById("form-due-date").value = "";

			}

        });


		/*------ Sorting Functions ------*/


        function sortHours(){

            if (reverseSortHours === 0){

                assignments.sort(function(a, b){
                    return a.thours-b.thours
                });

                reverseSortHours = 1;

			}

			else if (reverseSortHours === 1) {

                assignments.sort(function (a, b) {
                    return b.thours - a.thours
                });

                reverseSortHours = 0;

            }

            refreshTable()

        }





        function sortId(){

            if (reverseSortId === 0){

                assignments.sort(function(a, b){
                    var nameA=b.projid.toLowerCase(), nameB=a.projid.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                });

                reverseSortId = 1;

			}

            else if (reverseSortId === 1){

                assignments.sort(function(a, b){
                    var nameA=a.projid.toLowerCase(), nameB=b.projid.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                });

                reverseSortId = 0;

            }

            refreshTable()

        }




            function sortDesc(){

                if (reverseSortDesc === 0){

                    assignments.sort(function(a, b){
                        var nameA=b.projdesc.toLowerCase(), nameB=a.projdesc.toLowerCase()
                        if (nameA < nameB)
                            return -1
                        if (nameA > nameB)
                            return 1
                        return 0
                    });

                    reverseSortDesc = 1;

                }

                else if (reverseSortDesc === 1){

                    assignments.sort(function(a, b){
                        var nameA=a.projdesc.toLowerCase(), nameB=b.projdesc.toLowerCase()
                        if (nameA < nameB)
                            return -1
                        if (nameA > nameB)
                            return 1
                        return 0
                    });

                    reverseSortDesc = 0;

                }

                refreshTable()

        }




        function sortModule(){

            if (reverseSortModule === 0){

                assignments.sort(function(a, b){
                    var nameA=b.module.toLowerCase(), nameB=a.module.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                });

                reverseSortModule = 1;

            }

            else if (reverseSortModule === 1){

                assignments.sort(function(a, b){
                    var nameA=a.module.toLowerCase(), nameB=b.module.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                });

                reverseSortModule = 0;

            }

            refreshTable()

        }




        function sortDate() {

            if (reverseSortDate === 0){

                assignments.sort(function(a,b){

                    return new Date(b.due) - new Date(a.due);

                });

                reverseSortDate = 1;

			}

			else  if (reverseSortDate === 1) {

                assignments.sort(function(a,b){

                    return new Date(a.due) - new Date(b.due);

                });

                reverseSortDate = 0;

			}

            refreshTable()

        }
        
        function showMenu() {
                
                document.getElementById("form-decoration").style.left = "0px";
            
        }
        
        function hideMenu(){
            
            document.getElementById("form-decoration").style.left = "-250px";
            
        }




    }
//const URL = "http://150.230.35.140:8080/api/";
const URL = "http://localhost:8080/api/";

function autoTraeCategoria(){
    
    console.log("se esta ejecutando")
    $.ajax({
        url:URL + "Category/all",
        type:"GET",
        dataType:"JSON",
        success:function(respuesta){
            console.log("Respuesta"+ respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+ name.id+'>'+name.name +'</option>');
                console.log("select "+ name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionCubiculos() {
    $.ajax({
        url:URL + "Lib/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaCubiculos(response);
        }

    });

}

function pintarRespuestaCubiculos(response){

    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>Nombre del cubiculo</th><th>Objetivo</th><th>Capacidad</th><th>Descripcion</th><th>Nombre categoria</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].target + "</td>";
        myTable+="<td>" + response[i].capacity + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonSkate2" onclick="borrar(' + response[i].id + ')">Borrar Cubiculos!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="cargarDatosCubiculos(' + response[i].id + ')">Editar Cubiculos</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="actualizar(' + response[i].id + ')">Actualizar Cubiculos</button></td>'
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaCubiculos").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosCubiculos(id) {
    $.ajax({
        dataType: 'json',
        url:URL + "Lib/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#namesalones").val(item.name);
            $("#target").val(item.target);
            $("#capacity").val(item.capacity);
            $("#descriptionsalones").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarCubiculos() {

    if($("#namesalones").val().length == 0 || $("#target").val().length == 0 || $("#capacity").val().length == 0 || $("#descriptionsalones").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#namesalones").val(),
                target: $("#target").val(),
                capacity: $("#capacity").val(),
                description: $("#descriptionsalones").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:URL + "Lib/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#miListaCubiculos").empty();
                    $("#namesalones").val("");
                    $("#target").val("");
                    $("#capacity").val("");
                    $("#descriptionsalones").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
    console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:URL + "Lib/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaCubiculos").empty();
                traerInformacionCubiculos();
                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#namesalones").val().length == 0 || $("#target").val().length == 0 || $("#capacity").val().length == 0 || $("#descriptionsalones").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#namesalones").val(),
            target: $("#target").val(),
            capacity: $("#capacity").val(),
            description: $("#descriptionsalones").val(),
            category:{id: + $("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:URL + "Lib/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaCubiculos").empty();
                traerInformacionCubiculos()
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#miListaCubiculos").empty();
                $("#id").val("");
                $("#namesalones").val("");
                $("#target").val("");
                $("#capacity").val("");
                $("#descriptionsalones").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}

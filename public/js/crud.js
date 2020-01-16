(function($){

    var socket = io.connect('/crud',{forceNew:true});
    socket.on('tiendita',function(data){
        var docc = data.doc;
        var arreglo = new Array();
        for( var i in docc){
            const{_id,codigo,cantidad,nombre,provedor,venta,costo} = docc[i];
            arreglo.push({
                id:_id,
                codigo:codigo,
                cantidad:cantidad,
                nombre:nombre,
                provedor:provedor,
                venta:venta,
                costo:costo
            })
        }
        $('.table').DataTable({
            destroy:true,
            data:arreglo,
            rowId:'id',
            columns:[{
                title: 'Codigo',
                data: 'codigo'
            },
        {
            title:'Cantidad',
            data:'cantidad'
        },
    {
        title:'Nombre',
        data:'nombre'
    },
    {
        title:'Costo',
        data:'costo'
    },
    {
        title:'Venta',
        data:'venta'
    },
    {
        tile:'opciones',
        data:'file',
        render: function(data,type,row){
            return(
                '<div class= "ui icon buttons">'+
                '<button class="editar ui button yellow"><i class="edit icon"></i></button>'+
                '<button class="delete ui button negative"><i class="window close icon"></i></button>'+
                "</div>"
            )

        }
    }]
        })
    })


    $('.guardar').click(function(){
    
        var cantidad = $('.cantidad').val();
        var codigo = $('.codigo').val();
        var nombre = $('.nombre').val();
        var provedor = $('.provedor').val();
        var costo = $('.costo').val();
        var venta = $('.venta').val();
       
       axios.post('/crud',{
        cantidad:cantidad,
        codigo:codigo,
        nombre:nombre,
        provedor:provedor,
        costo:costo,
        venta:venta
       }).then(function(response){
           if(response){
               Swal.fire(
                'Producto registrado',
                'Exito en el registro'
               ),
            $('.cantidad').val("");
            $('.codigo').val("");
            $('.nombre').val("");
            $('.provedor').val("");
            $('.costo').val("");
            $('.venta').val("");
           }
       }).catch(function(err){
           console.log(err)
       })
    
    })

})(jQuery)

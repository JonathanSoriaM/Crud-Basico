(function($){

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

$('#addForm').on('submit', function(e){
    let btn = $('#addForm button[type="submit"]');
    new FormValidator(this, [{
        name: 'name',
        display: 'name',
        rules: 'required'
    }, {
        name: 'nickname',
        display: 'nickname',
        rules: 'required|alpha_dash'
    }, {
        name: 'kodePos',
        display: 'kodePos',
        rules: 'required'
    }], function(errors, event) {
        if(errors.length >= 1){
            $('.form-control').removeClass('is-invalid');
            $.each(errors, (i, dt) => {
                i == 0 && $(`#${errors[i].id}`).focus(); 
                $(`#${errors[i].id}`).addClass('is-invalid');
            });
        }else{
            $('.form-control').removeClass('is-invalid');
            event.isTrusted == true && (
                insertData(btn,""),
                disableBtn(btn)
            );
        }
    });
    e.preventDefault();
});

$('#editForm').on('submit', function(e){
    let btn = $('#editForm button[type="submit"]');
    new FormValidator(this, [{
        name: 'nameEdit',
        display: 'nameEdit',
        rules: 'required'
    }, {
        name: 'nicknameEdit',
        display: 'nicknameEdit',
        rules: 'required|alpha_dash'
    }, {
        name: 'kodePosEdit',
        display: 'kodePosEdit',
        rules: 'required'
    }], function(errors, event) {
        if(errors.length >= 1){
            $('.form-control').removeClass('is-invalid');
            $.each(errors, (i, dt) => {
                i == 0 && $(`#${errors[i].id}`).focus(); 
                $(`#${errors[i].id}`).addClass('is-invalid');
            });
        }else{
            event.isTrusted == true && (
                $('.form-control').removeClass('is-invalid'),
                insertData(btn, $('#editId').val()),
                disableBtn(btn)
            );
        }
    });
    e.preventDefault();
});
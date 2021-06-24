const columns = [
    {title: "#"},
    {title: "Nama"},
    {title: "Username"},
    {title: "Operasi"},
];

const getData = () => {
    $('#targetContent').html(loader);
    const url = `${baseUrl}users/get`;
    let dataset = [];
    $.get(url).done((res) => {
        $.each(res, (i, dt) => {
            i += 1;
            data = [i, `<p class="font-weight-bold text-primary m-0">${dt.name}</p>`, dt.username,  generateOpr(dt.id, dt.name, dt.username)];
            dataset.push(data);
        });
    }).fail(() => {
        $('#targetContent').html('<p class="text-center">Gagal Memuat Data</p>');
    }).then(() => {
        targetContent().then((mess) => {mess == "success" && showData(dataset)});
    });
}

const generateOpr = (id, name, username) => {
    let opr = `<div class="btn-group" role="group">
                    <button type="button" data-id="${id}" class="edit-btn btn btn-light btn-sm" data-toggle="modal" data-target="#editModal" data-id="${id}" data-name="${name}" data-username="${username}">
                        <i class="h5 mdi mdi-pencil text-success"></i>
                    </button>
                    <button type="button" onclick="delConfirm('users','${id}')" data-id="${id}" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top" title="Delete">
                        <i class="h5 mdi mdi-trash-can text-danger"></i>
                    </button>
                </div>`;
    return opr;
}

const insertUser = (btn, id) => {
    hideAlert();

    let url = `${baseUrl}users/add`, modal = "#modelId", optName = '';
    id != "" && (url = `${baseUrl}users/edit/${id}`, modal = "#editModal", optName = 'Edit');

    let name = $(`#name${optName}`).val(),
        username = $(`#username${optName}`).val();
    $.post(url, {
        name: name,
        username: username,
        password: $(`#password1${optName}`).val()
    }).done((res) => {
        if(res.status == 1) {
            
            changeTextBtn(btn, "Data Terkirim");
            hideLoadingBtn(btn);

            setTimeout(() => {
                $(modal).modal('toggle');
                changeTextBtn(btn, "Submit");
                enableBtn(btn);
                id == "" ? appendData(res.resId, name, username) : getData();
            },1000);
        }else{

            showAlert(res.desc),
            btn.prop('disabled', false)

        }
    }).fail((res) => {
        showAlert(res.responseJSON.desc);
        hideLoadingBtn(btn);
        setTimeout(() => {
            changeTextBtn(btn, "Submit");
            enableBtn(btn);
        },1000)
    });
};

const appendData = (id, name, username) => {
    myTable.row.add([ myTable.rows().count()+1, `<p class="font-weight-bold text-primary m-0">${name}</p>`, username, generateOpr(id, name, username)]).draw().node();
}

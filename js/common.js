const dq_canvas = document.querySelector("#canvas");
const ctx = dq_canvas.getContext("2d");

var iconimage = null;
var iconimagePoint = {
    "sx": null,
    "sy": null,
    "sw": null,
    "sh": null
};

const uploaded = document.getElementById('uploader');
uploaded.addEventListener('change', cropIMG);

let cropper = null;
const cropAspectRatio = 3.0 / 4.0;
const scaledWidth = 240;

//// 入力欄_beg(ターゲット)

const i_color = document.getElementById("textcolor");
// NAME
const i_name = document.getElementById("name");
const i_id = document.getElementById("id");
const i_id_tw = document.getElementById("id_tw");
const i_id_dc = document.getElementById("id_dc");

const use_class1 = document.getElementById("class1");
const use_class1_lv = document.getElementById("class1_lv");
const use_class2 = document.getElementById("class2");
const use_class2_lv = document.getElementById("class2_lv");
const use_class3 = document.getElementById("class3");
const use_class3_lv = document.getElementById("class3_lv");
const use_class4 = document.getElementById("class4");
const use_class4_lv = document.getElementById("class4_lv");

const i_rank = document.getElementById("rank");

const i_cat = document.getElementById("cat");
const i_cbt = document.getElementById("cbt");

const bar_p1 = document.getElementById("playstyle1");
const bar_p2 = document.getElementById("playstyle2");

const i_weekd_beg = document.getElementById("weekd_beg");
const i_weekd_fin = document.getElementById("weekd_fin");
const i_holid_beg = document.getElementById("holid_beg");
const i_holid_fin = document.getElementById("holid_fin");

const i_vc_radio = document.getElementsByName("vc_radio");

const i_ps_area = document.getElementById("ps_area");

const i_guild = document.getElementsByName("guild");
const i_guid_name = document.getElementById("guild_name");

const i_game_exp = document.getElementById("game_exp");
const i_free_com = document.getElementById("free_com");

//// 入力欄_fin(ターゲット)

function drawcanvas() {
    // 画像読み込み_beg
    const baseImg = new Image();
    baseImg.src = "./img/bp_introduction.png"
    baseImg.onload = function () {
        ctx.drawImage(baseImg, 0, 0);
        drawInput();
    }
    // 画像読み込み_fin
}

function drawInput() {
    // 現在日付
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '18px sans-serif';
    var today = new Date();
    let date = today.getFullYear() + "/" + ('0' + today.getMonth()).slice(-2) + "/" + ('0' + today.getDate()).slice(-2);
    ctx.fillText(date, 10, 1480);

    // 入力部文字色
    ctx.fillStyle = i_color.value;

    //// 入力欄_beg(文字入れ)

    // NAME
    ctx.font = '38px sans-serif';
    ctx.fillText(i_name.value, 410, 300);

    // ID
    ctx.font = '28px sans-serif';
    ctx.fillText(i_id.value, 860, 300);

    // TWITTER
    if (i_id_tw.value.length != 0) {
        ctx.font = '16px sans-serif';
        ctx.fillText("@" + i_id_tw.value, 440, 355);
    }
    // DISCORD
    ctx.font = '28px sans-serif';
    ctx.fillText(i_id_dc.value, 790, 355);

    // クラス1(イージスファイター)
    ctx.font = '48px sans-serif';
    if (use_class1.checked == true) {
        ctx.fillText("✔", 445, 530);

        document.getElementById("class1_area").style.display = "block";
        ctx.font = '26px sans-serif';
        ctx.fillText(use_class1_lv.value, 450, 560);
    } else {
        document.getElementById("class1_area").style.display = "none";
    }

    // クラス2(ツインストライカー)
    ctx.font = '48px sans-serif';
    if (use_class2.checked == true) {
        ctx.fillText("✔", 565, 530);

        document.getElementById("class2_area").style.display = "block";
        ctx.font = '26px sans-serif';
        ctx.fillText(use_class2_lv.value, 570, 560);
    } else {
        document.getElementById("class2_area").style.display = "none";
    }

    // クラス3(ブラストアーチャー)
    ctx.font = '48px sans-serif';
    if (use_class3.checked == true) {
        ctx.fillText("✔", 685, 530);

        document.getElementById("class3_area").style.display = "block";
        ctx.font = '26px sans-serif';
        ctx.fillText(use_class3_lv.value, 690, 560);
    } else {
        document.getElementById("class3_area").style.display = "none";
    }

    // クラス4(スペルキャスター)
    ctx.font = '48px sans-serif';
    if (use_class4.checked == true) {
        ctx.fillText("✔", 805, 530);

        document.getElementById("class4_area").style.display = "block";
        ctx.font = '26px sans-serif';
        ctx.fillText(use_class4_lv.value, 810, 560);
    } else {
        document.getElementById("class4_area").style.display = "none";
    }

    // RANK
    ctx.font = '28px sans-serif';
    ctx.fillText(i_rank.value, 915, 460);

    //CAT
    ctx.font = '28px sans-serif';
    if (i_cat.checked == true) {
        ctx.fillText("✔", 910, 540);
    }

    //CBT
    ctx.font = '28px sans-serif';
    if (i_cbt.checked == true) {
        ctx.fillText("✔", 910, 565);
    }

    //プレイスタイル1
    let p1_x = (bar_p1.value * 63) + 240;
    ctx.beginPath();
    ctx.arc(p1_x, 715, 25, 0, Math.PI * 2);
    ctx.fill()
    ctx.closePath();

    //プレイスタイル2
    let p2_x = (bar_p2.value * 63) + 240;
    ctx.beginPath();
    ctx.arc(p2_x, 775, 25, 0, Math.PI * 2);
    ctx.fill()
    ctx.closePath();

    //平日_始点
    ctx.font = '28px sans-serif';
    ctx.fillText(i_weekd_beg.value, 800, 702);

    //平日_終点
    ctx.font = '28px sans-serif';
    ctx.fillText(i_weekd_fin.value, 920, 702);

    // 平日_間文字
    if (i_weekd_beg.value.length != 0 && i_weekd_fin.value.length != 0) {
        ctx.font = '28px sans-serif';
        ctx.fillText("　～　", 860, 702);
    }

    //休日_始点
    ctx.font = '28px sans-serif';
    ctx.fillText(i_holid_beg.value, 800, 755);

    //休日_終点
    ctx.font = '28px sans-serif';
    ctx.fillText(i_holid_fin.value, 920, 755);

    // 休日_間文字
    if (i_holid_beg.value.length != 0 && i_holid_fin.value.length != 0) {
        ctx.font = '28px sans-serif';
        ctx.fillText("　～　", 860, 755);
    }


    // VCラジオボタン
    ctx.font = '48px sans-serif';
    let vc0 = i_vc_radio[0].checked;
    let vc1 = i_vc_radio[1].checked;
    let vc2 = i_vc_radio[2].checked;
    if (vc0 == true) {
        ctx.fillText("✔", 825, 845);
    } else if (vc1 == true) {
        ctx.fillText("✔", 825, 880);
    } else if (vc2 == true) {
        ctx.fillText("✔", 825, 915);
    }

    // プレイスタイルフリーコメント
    ctx.font = '28px sans-serif';
    const i_ps_area_arr = i_ps_area.value.split('\n');

    for (let i = 0; i < i_ps_area_arr.length; i++) {
        let pointer = (i_ps_area_arr.length - i) - 1;
        let pointer_y = 920 - i * 28;
        ctx.fillText(i_ps_area_arr[pointer], 120, pointer_y);
    }

    // ギルドボタン
    ctx.font = '48px sans-serif';
    let guild0 = i_guild[0].checked;
    let guild1 = i_guild[1].checked;
    let guild2 = i_guild[2].checked;
    let guild3 = i_guild[3].checked;
    let guild4 = i_guild[4].checked;
    if (guild0 == true) {
        ctx.fillText("✔", 173, 1060);
    } else if (guild1 == true) {
        ctx.fillText("✔", 173, 1092);
    } else if (guild2 == true) {
        ctx.fillText("✔", 173, 1124);
    } else if (guild3 == true) {
        ctx.fillText("✔", 350, 1060);
    } else if (guild4 == true) {
        ctx.fillText("✔", 350, 1092);
    }

    //ギルド名
    ctx.font = '28px sans-serif';
    ctx.fillText(i_guid_name.value, 530, 1110);

    // オンラインゲーム経験
    ctx.font = '28px sans-serif';
    const i_game_exp_arr = i_game_exp.value.split('\n');
    for (let i = 0; i < i_game_exp_arr.length; i++) {
        let pointer_y = 1270 + i * 31;
        ctx.fillText(i_game_exp_arr[i], 120, pointer_y);
    }

    // 自由コメント
    ctx.font = '28px sans-serif';
    const i_free_com_arr = i_free_com.value.split('\n');
    for (let i = 0; i < i_free_com_arr.length; i++) {
        let pointer_y = 1239 + i * 31;
        ctx.fillText(i_free_com_arr[i], 510, pointer_y);
    }

    // 画像
    if (iconimage != null) {
        ctx.drawImage(iconimage, iconimagePoint.sx, iconimagePoint.sy, iconimagePoint.sw, iconimagePoint.sh, 50, 245, 240, 320);
    }

    //// 入力欄_fin(文字入れ)
}

function cropIMG(evt) {
    const files = evt.target.files;
    if (files.length == 0) {
        return;
    }
    let file = files[0];
    let image = new Image();
    let reader = new FileReader();
    reader.onload = function (evt) {
        image.onload = function () {
            let scale = scaledWidth / image.width;
            let imageData = null;
            {
                const canvas = document.getElementById("sourceCanvas");
                {
                    let ctximg = canvas.getContext("2d");
                    canvas.width = image.width * scale;
                    canvas.height = image.height * scale;
                    ctximg.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
                }
                if (cropper != null) {
                    // 画像を再読み込みした場合破棄
                    cropper.destroy();
                }
                cropper = new Cropper(canvas, {
                    aspectRatio: cropAspectRatio,
                    movable: false,
                    scalable: false,
                    zoomable: false,
                    crop: function (event) {
                        {
                            iconimage = image;
                            iconimagePoint = {
                                "sx": event.detail.x / scale,
                                "sy": event.detail.y / scale,
                                "sw": event.detail.width / scale,
                                "sh": event.detail.height / scale
                            }
                            drawInput();
                        }
                    }
                });
            }
        }
        image.src = evt.target.result;
    }
    reader.readAsDataURL(file);
}

const downloadLink = document.getElementById('download_link');

function canvasDataDownload() {

    downloadLink.href = dq_canvas.toDataURL('image/png');
    downloadLink.download = "ブルプロ自己紹介カード.png";
    downloadLink.click();
}

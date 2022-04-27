var answertype;
var aa = "";
var bb = "";
var default_link = 'https://i.imgur.com/H8jIbSB.jpg';
var get_link = '';
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
var current_cat = '';
var current_choice = '';
var mobile_no = '';
var data_totalprice = 0.00;
var ip_c = {};
const user_agent = navigator.userAgent;
//const unixTime = Math.floor(Date.now() / 1000);
const urlWithOutParameters = window.location.href.split('?')[0];
const urlHostParameters = window.location.protocol + '//' + window.location.host;
var load_agent = 0;
var fb_token = '';
var fb_pixel = '';
var tt_pixel = '';
var tt_token = '';
var ttclid = '123ATXSfe';

function getIP() {
    try {
        //load_agent = 1;
        //getDetail();
        $.getJSON('https://ipinfo.io/json', function (data) {
            ip_c = data;
            load_agent = 1;
            getDetail();
        });
    }
    catch (err) {
        $(location).attr('href', 'errorpage.html');
    }
}
function AddMetaTag(attr, content, value) {
    try {
        //let link = document.createElement('meta');
        //link.setAttribute(attr, content);
        //link.content = document.location;
        //document.getElementsByTagName('head')[0].appendChild(value);

        $('head').append('<meta ' + attr + '="' + content + '" content="' + value + '">');
    }
    catch (err) {

    }
}

$(document).ready(function () {
    // =========================================================
    // Load Default Data
    // =========================================================
    //Declare Variebles

    //radioswitch.init();

    // =========================================================
    // Checking Facebook Login Status
    // =========================================================
    new WOW().init();

    try {
        answertype = getUrlParameter('st');
        answertype = atob(answertype);
        ttclid = getUrlParameter('ttclid');

        if (ttclid === undefined) {
            ttclid = '';
        }
        else if (ttclid == '__CLICKID__') {
            ttclid = '123ATXSfe';
        }

        getIP();
    }
    catch (err) {
        aa = "";
        bb = "";

        Swal.fire({
            type: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'URL ไม่ถูกต้อง!!'
        });
        return false;

    }

});

function getDetail() {
    try {
        $.ajax({
            url: 'Service/SalePage.asmx/DP_SHOPCAT_GET_FRONT',
            data: {
                store_id: answertype
            },
            method: 'post',
            dataType: 'xml',
            success: function (data) {
                var jqueryXml = $(data);
                if (jqueryXml.find('results').text() == 'Error') {
                    $(location).attr('href', 'errorpage.html');
                }
                else {
                    if (jqueryXml.find('results').text() == 'ERROR') {

                        $(location).attr('href', 'errorpage.html');
                    }
                    else {

                        let title = jqueryXml.find('results2').text();
                        let header = jqueryXml.find('results3').text();
                        document.title = jqueryXml.find('results2').text();
                        AddMetaTag('property', 'og:title', title);
                        AddMetaTag('property', 'og:description', title);
                        AddMetaTag('property', 'og:type', 'website');
                        AddMetaTag('property', 'og:url', window.location.href);
                        $('#shop_name').html(title);
                        $('#shop_bio').html(header);

                        fb_pixel = jqueryXml.find('results4').text();
                        fb_token = jqueryXml.find('results9').text();
                        tt_pixel = jqueryXml.find('results6').text();
                        tt_token = jqueryXml.find('results10').text();

                        let current_sample_pro = jqueryXml.find('results11').text();
                        $('#profile_pic').attr("src", current_sample_pro);
                        $('#profile_pic').attr("alt", current_sample_pro);

                        let current_bg = jqueryXml.find('results12').text();
                        $('#bg_img').attr("src", current_bg);
                        $('#bg_img').attr("alt", current_bg);

                        //facebook link
                        let drive_social = 0;
                        if (jqueryXml.find('results13').text() != '') {
                            $('#d_social').append('<img src="https://i.imgur.com/mw5wxp6.png" id="facebook" class="shadow-sm mr-2" width="40">');
                            $("#facebook").click(function () {
                                $(location).attr('href', jqueryXml.find('results13').text());
                            });
                        }

                        //ig link
                        if (jqueryXml.find('results14').text() != '') {
                            $('#d_social').append('<img src="https://i.imgur.com/B8CJ4Sn.png" id="ig"  class="shadow-sm mr-2" width="40">');
                            $("#ig").click(function () {
                                $(location).attr('href', jqueryXml.find('results14').text());
                            });
                        }

                        //line link
                        if (jqueryXml.find('results15').text() != '') {
                            $('#d_social').append('<img src="https://i.imgur.com/JWHGqfE.png" id="line_p" class="shadow-sm mr-2" width="40">');
                            $("#line_p").click(function () {
                                $(location).attr('href', jqueryXml.find('results15').text());
                            });
                        }

                        //twitter link
                        if (jqueryXml.find('results16').text() != '') {
                            $('#d_social').append('<img src="https://i.imgur.com/7qH7Bd4.png" id="twitter" class="shadow-sm mr-2" width="40">');
                            $("#twitter").click(function () {
                                $(location).attr('href', jqueryXml.find('results16').text());
                            });
                        }

                        //youtube link
                        if (jqueryXml.find('results17').text() != '') {
                            $('#d_social').append('<img src="https://i.imgur.com/UCltoYh.png" id="youtube" class="shadow-sm mr-2" width="40">');
                            $("#youtube").click(function () {
                                $(location).attr('href', jqueryXml.find('results17').text());
                            });
                        }

                        //tiktok link
                        if (jqueryXml.find('results18').text() != '') {
                            $('#d_social').append('<img src="https://i.imgur.com/X7CXHlV.png" id="tiktok" class="shadow-sm mr-2" width="40">');
                            $("#tiktok").click(function () {
                                $(location).attr('href', jqueryXml.find('results18').text());
                            });
                        }

                        var Slide_json = { "data": [] };

                        if (jqueryXml.find('results20').text() != '') {
                            try {
                                Slide_json = JSON.parse(jqueryXml.find('results20').text());

                                //console.log(JSON.stringify(Slide_json));

                                if (Slide_json.data.length > 0) {
                                    MgSlide(Slide_json);
                                }

                            }
                            catch (err) {

                            }

                        }

                        MappingFbConversionEvent("ViewContent");
                        MappingTTConversionEvent('ViewContent');
                    }

                }
            },
            error: function (err) {
                $(location).attr('href', 'errorpage.html');

            }
        });
    }
    catch (err) {
        $(location).attr('href', 'errorpage.html');
    }
}
function MgSlide(balloonJson) {

    let left_c = '<div class="col-6" onclick="clicklink(\'s_link\');"><div class="card card-ecommerce mb-2 ml-2 mr-1"><div class="view overlay z-depth-1"><img src="img_link" class="card-img-top" alt=""><a><div class="mask rgba-white-slight waves-effect waves-light"></div></a></div><div class="card-body text-center no-padding mt-2"><p class="card-text text-left p-1 mt-2 card-description"><a href="" class="grey-text">desc</a></p><div class="card-footer bg-danger w-100" style="height:50px;"><a class="active" data-toggle="tooltip" data-placement="top"><i class="fas fa-map-marker-alt text-white"> พิกัด</i></a></div></div></div></div>';
    let right_c = ' <div class="col-6" onclick="clicklink(\'s_link\');"><div class="card card-ecommerce mb-2 mr-2 ml-1"><div class="view overlay z-depth-1"><img src="img_link" class="card-img-top" alt=""><a><div class="mask rgba-white-slight waves-effect waves-light"></div></a></div><div class="card-body text-center no-padding mt-2"><p class="card-text text-left p-1 mt-2 card-description"><a href="" class="grey-text">desc</a></p><div class="card-footer bg-danger w-100" style="height:50px;"><a class="active" data-toggle="tooltip" data-placement="top"><i class="fas fa-map-marker-alt text-white"> พิกัด</i></a></div></div></div></div>';

    $('#salepage_list').html('');

    for (i in balloonJson.data) {
        if (i % 2 == 0) {
            let s_link = btoa(balloonJson.data[i].order_id) + "|" + btoa(answertype);
            s_link = 'https://mudcha.com/previewsalepage.html?st=' + btoa(s_link) + '&ttclid=__CLICKID__';
            
            let mapObj = {
                img_link: balloonJson.data[i].slide_value,
                desc: balloonJson.data[i].sp_title,
                s_link: s_link
            };

            let ind = left_c.replace(/\b(?:img_link|desc|s_link)\b/gi, matched => mapObj[matched]);

            $('#salepage_list').append(ind);
        }
        else {
            let s_link = btoa(balloonJson.data[i].order_id) + "|" + btoa(answertype);
            s_link = 'https://mudcha.com/previewsalepage.html?st='+btoa(s_link)+'&ttclid=__CLICKID__';
            
            let mapObj = {
                img_link: balloonJson.data[i].slide_value,
                desc: balloonJson.data[i].sp_title,
                s_link: s_link
            };

            let ind = right_c.replace(/\b(?:img_link|desc|s_link)\b/gi, matched => mapObj[matched]);

            $('#salepage_list').append(ind);
        }
    }

    
}
function clicklink(msglink) {
    $(location).attr('href', msglink);
    //console.log(msglink);
}

/* Event Tracking */
function MappingFbConversionEvent(eventName) {
    try {

        if (load_agent == 1 && fb_token != '' && fb_pixel != '') {

            let unixTime = Math.floor(Date.now() / 1000);
            let url = 'https://graph.facebook.com/v13.0/' + fb_pixel.trim() + '/events?access_token=' + fb_token;
            let conversion_json = { "data": [] };
            //user_agent
            //ip_c.ip
            //urlWithOutParameters
            if (ev_json.data.length > 0 && cat_json.data.length > 0) {
                data_totalprice = 0.00;
                for (i in ev_json.data) {
                    for (j in cat_json.data) {
                        if (ev_json.data[i].cat_id == cat_json.data[j].cat_id) {
                            data_totalprice += (parseFloat(ev_json.data[i].qty) * parseFloat(cat_json.data[j].cat_price));
                        }
                    }
                }
            }

            if (eventName == 'ViewContent') {

                let dataRec = {
                    "event_name": "ViewContent",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'PageView_3s') {

                let dataRec = {
                    "event_name": "PageView_3s",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'PageView_15s') {

                let dataRec = {
                    "event_name": "PageView_15s",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'PageView_30s') {

                let dataRec = {
                    "event_name": "PageView_30s",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'PageView_1m') {

                let dataRec = {
                    "event_name": "PageView_1m",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'Search') {

                let dataRec = {
                    "event_name": "Search",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'MSG_LINK') {

                let dataRec = {
                    "event_name": "MSG_LINK",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'CONTACT_CLICK') {

                let dataRec = {
                    "event_name": "CONTACT_CLICK",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'Purchase') {

                let dataRec = {
                    "event_name": "Purchase",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    },
                    "custom_data": {
                        "currency": "THB",
                        "value": data_totalprice
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'AddToWishlist') {

                let dataRec = {
                    "event_name": "AddToWishlist",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    },
                    "custom_data": {
                        "currency": "THB",
                        "value": data_totalprice
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }
            else if (eventName == 'AddToCart') {

                let dataRec = {
                    "event_name": "AddToCart",
                    "event_time": unixTime,
                    "action_source": "website",
                    "event_source_url": urlWithOutParameters,
                    "user_data": {
                        "client_user_agent": user_agent,
                        "client_ip_address": ip_c.ip
                    },
                    "custom_data": {
                        "currency": "THB",
                        "value": data_totalprice
                    }
                }

                conversion_json.data.push(dataRec);
                SendFbConversionEvent(conversion_json, url);
            }

        }
    }
    catch (err) {
        console.log(err.message);
    }
}
function SendFbConversionEvent(conversion_json, url) {
    try {
        //console.log(JSON.stringify(conversion_json));
        if (conversion_json.data.length > 0) {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(conversion_json),
                success: function (data, textStatus, jQxhr) {
                    console.log(JSON.stringify(data));
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });

        }
    }
    catch (err) {
        console.log(err.message);
    }
}

function MappingTTConversionEvent(eventName) {
    try {


        if (tt_pixel != '' && tt_token != '') {

            let url = 'https://business-api.tiktok.com/open_api/v1.2/pixel/track/';
            let conversion_json = {};
            //user_agent
            //ip_c.ip
            //urlWithOutParameters
            if (ev_json.data.length > 0 && cat_json.data.length > 0) {
                data_totalprice = 0.00;
                for (i in ev_json.data) {
                    for (j in cat_json.data) {
                        if (ev_json.data[i].cat_id == cat_json.data[j].cat_id) {
                            data_totalprice += (parseFloat(ev_json.data[i].qty) * parseFloat(cat_json.data[j].cat_price));
                        }
                    }
                }
            }

            if (ttclid != '') {
                if (eventName == 'ViewContent') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "ViewContent",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "ad": {
                                "callback": ttclid
                            },
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'Search') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "Search",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "ad": {
                                "callback": ttclid
                            },
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'ClickButton') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "ClickButton",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "ad": {
                                "callback": ttclid
                            },
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'Contact') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "Contact",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "ad": {
                                "callback": ttclid
                            },
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'AddToCart') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "AddToCart",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "ad": {
                                "callback": ttclid
                            },
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        },
                        "properties": {
                            "currency": "THB",
                            "value": data_totalprice
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'PlaceAnOrder') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "PlaceAnOrder",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "ad": {
                                "callback": ttclid
                            },
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        },
                        "properties": {
                            "currency": "THB",
                            "value": data_totalprice
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'CompletePayment') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "CompletePayment",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "ad": {
                                "callback": ttclid
                            },
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        },
                        "properties": {
                            "currency": "THB",
                            "value": data_totalprice
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
            }
            else {
                if (eventName == 'ViewContent') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "ViewContent",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'Search') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "Search",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'ClickButton') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "ClickButton",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'Contact') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "Contact",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'AddToCart') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "AddToCart",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        },
                        "properties": {
                            "currency": "THB",
                            "value": data_totalprice
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'PlaceAnOrder') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "PlaceAnOrder",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        },
                        "properties": {
                            "currency": "THB",
                            "value": data_totalprice
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
                else if (eventName == 'CompletePayment') {

                    let dataRec = {
                        "pixel_code": tt_pixel,
                        "event": "CompletePayment",
                        "timestamp": new Date().toISOString(),
                        "context": {
                            "page": {
                                "url": urlWithOutParameters,
                                "referrer": urlHostParameters
                            },
                            "user_agent": user_agent,
                            "ip": ip_c.ip
                        },
                        "properties": {
                            "currency": "THB",
                            "value": data_totalprice
                        }
                    }

                    SendTTConversionEvent(dataRec, url);
                }
            }


        }
    }
    catch (err) {
        console.log(err.message);
    }
}

function SendTTConversionEvent(conversion_json, url) {
    try {
        //console.log(JSON.stringify(conversion_json));
        //console.log(tt_pixel);
        //console.log(tt_token);

        $.ajax({
            url: 'Service/SalePage.asmx/TiktokEventAPI',
            data: {
                jsonstring: JSON.stringify(conversion_json),
                token: tt_token,
                url: url,
                eventname: "ViewContent",
                tiktok_pixel: tt_pixel
            },
            method: 'post',
            dataType: 'xml',
            success: function (data) {
                var jqueryXml = $(data);
                if (jqueryXml.find('results').text() == 'Error') {
                    console.log('err');
                }
                else {
                    let result = jqueryXml.find('results').text();

                    console.log(result);
                }
            },
            error: function (err) {
                console.log('err');
            }
        });
    }
    catch (err) {
        console.log(err.message);
    }
}
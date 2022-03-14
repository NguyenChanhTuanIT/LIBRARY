
// <div id="albot-area"></div>
// <script type="module" crossorigin="anonymous" src="http://localhost:3000/aibot.js"></script>
// CONFIG FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.8/firebase-auth.js";
import { signInWithPopup } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.8/firebase-auth.js";
import { TwitterAuthProvider } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.8/firebase-auth.js";
import { signOut } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.8/firebase-auth.js";

// START FIREBASE -------------------
const firebaseConfig = {
    apiKey: "AIzaSyD3JdAVrg4YlTy75QCUBXL1JyHEEDR5vWw",
    authDomain: "twitter-32c4f.firebaseapp.com",
    projectId: "twitter-32c4f",
    storageBucket: "twitter-32c4f.appspot.com",
    messagingSenderId: "944662499362",
    appId: "1:944662499362:web:dcb16572d5a49498fe7a7b",
    measurementId: "G-8183XFYY4H"
}
initializeApp(firebaseConfig);
// END FIREBASE
// ALL CONFIG
const config_web = {
    embed_id: 'albot-area',
    domain: 'https://ai-boot.rionlab.com',
    api_host: 'https://ai-boot.rionlab.com/api',
    tokenTw: 'access_key_tw',
    tokenTwInfo: 'access_key_tw_info',
    icon_logo: 'https://ai-boot.rionlab.com/assets/images/logo.png',
    icon_tweet_active: 'https://ai-boot.rionlab.com/assets/images/icon_twitter-active.png',
    icon_tweet: 'https://ai-boot.rionlab.com/assets/images/icon_twitter.png',
    icon_message_active: 'https://ai-boot.rionlab.com/assets/images/logo.png',
    icon_message: 'https://ai-boot.rionlab.com/assets/images/icon_message.png',
    id_after_login: 'header-logined',
    avatar_bot: 'https://ai-boot.rionlab.com/assets/images/img_boot.png',
    icon_social: [
        'https://ai-boot.rionlab.com/assets/images/embed/icon-comment.png',
        'https://ai-boot.rionlab.com/assets/images/embed/icon-hear.png',
        'https://ai-boot.rionlab.com/assets/images/embed/icon-retweet.png'
    ],
    id_html_area_login: 'aibot-login-area-ai',
    id_html_area_dashboard: 'aibot-dashoard-area',
    id_html_area_ai: 'aibot-dashoard-tab-ai',
    id_html_area_comment: 'aibot-dashoard-tab-comment',
    id_html_area_comment_left: 'aibot-dashoard-tab-comment-left',
    id_html_area_comment_right: 'aibot-dashoard-tab-comment-right',
    id_html_area_comment_detail: 'aibot-dashoard-comment-reply-post-detail',
    id_html_area_comment_detail_box_chat: 'aibot-dashoard-comment-reply-post-detail-box-chat',
    id_html_area_comment_textarea: 'aibot-dashoard-comment-textarea',
    id_html_loading: 'aibot-loading',
    method_get: 'GET',
    method_post: 'POST',
}
// END ALL CONFIG
// COMMON FUNTION AND VARIABLE
const AUTH = getAuth();
const EMBED_AREA = document.getElementById(config_web.embed_id);
const styleTag = document.createElement('style');
styleTag.textContent = `*{box-sizing: border-box};
@-webkit-keyframes aibotspin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  
  @keyframes aibotspin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleTag);

var total_page = 1;
var current_page = 1;
function returnHeaderAndLogo(params) {
    // HEADER 
    var headTitle = document.createElement('h2');
    headTitle.style.display = 'flex';
    headTitle.style.alignItems = 'center';
    headTitle.style.justifyContent = 'center';
    // header-img 
    var imgHead = document.createElement('img');
    imgHead.id = 'img' + params.id;
    imgHead.src = config_web.icon_logo;
    imgHead.style.width = '20px';
    imgHead.style.marginRight = '10px';
    headTitle.appendChild(imgHead);
    // header-text
    var headSpan = document.createElement('span');
    headSpan.id = 'span' + params.id;
    headSpan.innerText = params.txt;
    headSpan.style.color = '#4392A8';
    headSpan.style.fontSize = '12px';
    headSpan.style.fontWeight = 'bold';
    headTitle.appendChild(headSpan);
    return headTitle;
}
function changePropertyHeader(params) {
    document.getElementById('img' + params.id).src = params.src;
    document.getElementById('span' + params.id).innerText = params.txt;
}
function returnMessageChatNormal(params) {
    var newDivMessage = document.createElement('div');
    newDivMessage.classList.add('message');
    setStyleAtrribute(newDivMessage, {
        display: 'flex',
        align_items: 'flex-star',
        margin_bottom: '10px'
    });
    if (params.is_question) {
        setStyleAtrribute(newDivMessage, {
            flex_direction: 'row-reverse'
        });
    }

    var avatarDiv = document.createElement('div');
    setStyleAtrribute(avatarDiv, {
        width: '50px'
    });
    if (params.is_question) {
        setStyleAtrribute(avatarDiv, {
            text_align: 'right'
        });
    }
    var imgAvatarDiv = document.createElement('img');
    imgAvatarDiv.src = params.avatar;
    imgAvatarDiv.alt = 'avatar';
    setStyleAtrribute(imgAvatarDiv, {
        width: '30px',
        height: '30px',
        border_radius: '50%',
        display: 'inline-block'
    });

    avatarDiv.appendChild(imgAvatarDiv);

    var messageDiv = document.createElement('div');
    setStyleAtrribute(messageDiv, {
        width: 'calc(100% - 50px)'
    });

    var boxMessageDiv = document.createElement('div');

    var messageBoxMessageDiv = document.createElement('p');
    messageBoxMessageDiv.innerText = params.message;
    setStyleAtrribute(messageBoxMessageDiv, {
        width: '100%',
        display: 'block',
        height: 'auto',
        padding: '10px',
        color: 'black',
        font_size: '12px',
        margin: '0 0 5px 0',
        border_radius: '20px'
    });
    if (params.is_question) {
        setStyleAtrribute(messageBoxMessageDiv, {
            background_color: '#C1E9EF'
        });
    } else {
        setStyleAtrribute(messageBoxMessageDiv, {
            background_color: 'white'
        });
    }

    var labelDateBoxMessageDiv = document.createElement('p');
    labelDateBoxMessageDiv.innerText = params.date;
    setStyleAtrribute(labelDateBoxMessageDiv, {
        font_size: '8px',
        color: '#9B9B9B',
        margin: '0 0 5px 0'
    });


    boxMessageDiv.appendChild(messageBoxMessageDiv);
    boxMessageDiv.appendChild(labelDateBoxMessageDiv);

    messageDiv.appendChild(boxMessageDiv);

    newDivMessage.appendChild(avatarDiv);
    newDivMessage.appendChild(messageDiv);

    return newDivMessage;
}
function returnMessageChatSpecial(params) {
    var newDivMessage = document.createElement('div');
    newDivMessage.classList.add('message-special');
    setStyleAtrribute(newDivMessage, {
        display: 'flex',
        align_items: 'flex-star',
        margin_bottom: '10px',
        cursor: 'pointer'
    });


    var avatarDiv = document.createElement('div');
    setStyleAtrribute(avatarDiv, {
        width: '50px'
    });
    if (params.is_question) {
        setStyleAtrribute(avatarDiv, {
            text_align: 'right'
        });
    }
    var imgAvatarDiv = document.createElement('img');
    imgAvatarDiv.src = params.avatar;
    imgAvatarDiv.alt = 'avatar';
    setStyleAtrribute(imgAvatarDiv, {
        width: '30px',
        height: '30px',
        border_radius: '50%',
        display: 'inline-block'
    });
    avatarDiv.appendChild(imgAvatarDiv);

    var messageDiv = document.createElement('div');
    setStyleAtrribute(messageDiv, {
        width: 'calc(100% - 50px)'
    });

    var boxMessageDiv = document.createElement('div');

    var messageBoxMessageDiv = document.createElement('p');
    messageBoxMessageDiv.innerText = params.message;
    setStyleAtrribute(messageBoxMessageDiv, {
        width: '100%',
        display: 'block',
        height: 'auto',
        padding: '10px',
        color: 'black',
        font_size: '12px',
        margin: '0 0 5px 0',
        border_radius: '20px',
        background_color: 'white'
    });

    var bottomDateBoxMessageDiv = document.createElement('div');

    setStyleAtrribute(bottomDateBoxMessageDiv, {
        font_size: '10px',
        color: '#9B9B9B',
        margin: '0 0 5px 0',
        display: 'flex',
        align_items: 'center',
        justify_content: 'space-between'
    });

    var labelBottomDateBoxMessageDiv = document.createElement('label');
    labelBottomDateBoxMessageDiv.innerText = params.date;


    var ulBottomDateBoxMessageDiv = document.createElement('ul');
    setStyleAtrribute(ulBottomDateBoxMessageDiv, {
        display: 'flex',
        align_items: 'center',
        margin: '0 5px'
    });
    for (let index = 0; index < 3; index++) {
        var li = document.createElement('li');
        setStyleAtrribute(li, {
            display: 'flex',
            align_items: 'center',
            margin_right: '5px'
        });
        var img = document.createElement('img');
        img.src = config_web.icon_social[index];
        setStyleAtrribute(img, {
            width: '10px',
            height: '10px',
        });

        var span = document.createElement('span');
        span.innerText = '1';

        li.appendChild(img);
        li.appendChild(span);
        ulBottomDateBoxMessageDiv.appendChild(li);
    }




    bottomDateBoxMessageDiv.appendChild(labelBottomDateBoxMessageDiv);
    bottomDateBoxMessageDiv.appendChild(ulBottomDateBoxMessageDiv);

    boxMessageDiv.appendChild(messageBoxMessageDiv);
    boxMessageDiv.appendChild(bottomDateBoxMessageDiv);

    messageDiv.appendChild(boxMessageDiv);

    newDivMessage.appendChild(avatarDiv);
    newDivMessage.appendChild(messageDiv);

    return newDivMessage;
}
var setStyleAtrribute = (tag, propterty) => {
    for (const key in propterty) {
        let key2 = key.toString().replace(/_/g, '-');
        tag.style.setProperty(key2, propterty[key]);
    }
}
var loadFont = (name, url) => {
    let newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode('@font-face{font-family: ' + name + '; src: url(' + url + ');}'));
    document.body.appendChild(newStyle)
}
var callApi = (method, path, body, callback) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && callback) {
            callback(this);
        }
    }
    xhttp.open(method, config_web.api_host + path, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(body);
}
var callApiAwait = (method, path, body) => {
    return new Promise((resolve, reject) => {
        // const xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && callback) {
        //         resolve(this);
        //     }
        // }
        // xhttp.open(method, config_web.api_host + path, true);
        // xhttp.setRequestHeader("Content-type", "application/json");
        // xhttp.send(body);
        setTimeout(() => {
            resolve(true)
        }, 1000);
    });
}

var loadingUi = () => {
    let loadingTask = document.createElement('div');
    loadingTask.id = config_web.id_html_loading;
    setStyleAtrribute(loadingTask, {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        z_index: 2,
        background_color: '#00000050',
        display: 'flex',
        align_items: 'center',
        justify_content: 'center'
    });

    let loader = document.createElement('div');
    setStyleAtrribute(loader, {
        border: "2px solid #f3f3f3",
        border_radius: "50%",
        border_top: "2px solid #4392a8",
        width: "30px",
        height: "30px",
        animation: "aibotspin 2s linear infinite"
    });



    loadingTask.appendChild(loader);
    return loadingTask;
}

var showLoading = () => {
    document.getElementById(config_web.id_html_area_comment_right).appendChild(loadingUi());
}
var hideLoading = () => {
    document.getElementById(config_web.id_html_area_comment_right).removeChild(document.getElementById(config_web.id_html_loading));
}

var convertDate = (params) => {
    let year = new Date(params).getFullYear();
    let month_convert = new Date(params).getMonth() + 1;
    let month = '0' + month_convert.toString();
    let day_convert = new Date(params).getDate();
    let day = '0' + day_convert.toString();

    let minutes_convert = new Date(params).getMinutes();
    let minutes = '0' + minutes_convert.toString();
    let hour_convert = new Date(params).getHours();
    let hour = '0' + hour_convert.toString();
    return year + '/' + month.slice(-2) + '/' + day.slice(-2) + ' ' + hour.slice(-2) + ':' + minutes.slice(-2);
}
// END COMMON FUNTION AND VARIABLE
// UI  HOME
var renderElementComment = (tag, parent_tag, data) => {
    const arrayMessageTw = [
        {
            is_question: false,
            date: '2022.02.10 11:04',
            avatar: config_web.avatar_bot,
            message: 'DAIKO に質問をしてみてください。AIがお答えします。※ボックス右上のタグで「AI チャットボット」と「Twitter チャットボット」を切り替えることが出来ます。'
        },
        {
            is_question: false,
            date: '2022.02.10 11:04',
            avatar: config_web.avatar_bot,
            message: 'DAIKO に質問をしてみてください。AIがお答えします。※ボックス右上のタグで「AI チャットボット」と「Twitter チャットボット」を切り替えることが出来ます。'
        },
        {
            is_question: false,
            date: '2022.02.10 11:04',
            avatar: config_web.avatar_bot,
            message: 'DAIKO に質問をしてみてください。AIがお答えします。※ボックス右上のタグで「AI チャットボット」と「Twitter チャットボット」を切り替えることが出来ます。'
        },
        {
            is_question: false,
            date: '2022.02.10 11:04',
            avatar: config_web.avatar_bot,
            message: 'DAIKO に質問をしてみてください。AIがお答えします。※ボックス右上のタグで「AI チャットボット」と「Twitter チャットボット」を切り替えることが出来ます。'
        },
        {
            is_question: false,
            date: '2022.02.10 11:04',
            avatar: config_web.avatar_bot,
            message: 'DAIKO に質問をしてみてください。AIがお答えします。※ボックス右上のタグで「AI チャットボット」と「Twitter チャットボット」を切り替えることが出来ます。'
        }
    ];
    for (let index = 0; index < arrayMessageTw.length; index++) {
        const element = arrayMessageTw[index];
        const newElementMessageNormal = returnMessageChatSpecial(element);

        newElementMessageNormal.addEventListener('click', () => {
            showLoading();
            renderPopupReplyComment(parent_tag).then(
                uiReply => {
                    parent_tag.appendChild(uiReply);
                    hideLoading();
                }
            );
        });

        tag.appendChild(newElementMessageNormal);
    }
}
var renderPopupReplyComment = async (tag) => {

    let conversation_id = '';
    let arrayMessageTwDetail = [
        {
            is_question: false,
            date: '2022.02.10 11:04',
            avatar: config_web.avatar_bot,
            message: 'DAIKO に質問をしてみてください。AIがお答えします。※ボックス右上のタグで「AI チャットボット」と「Twitter チャットボット」を切り替えることが出来ます。'
        },
        {
            is_question: false,
            date: '2022.02.10 11:04',
            avatar: config_web.avatar_bot,
            message: 'DAIKO ddddddddddに質問をしてみてください。AIがお答えします。※ボックス右上のタグで「AI チャットボット」と「Twitter チャットボット」を切り替えることが出来ます。'
        }
    ];

    // UI 
    let replyCommentTwAreaRight = document.createElement('div');
    replyCommentTwAreaRight.id = config_web.id_html_area_comment_detail;
    setStyleAtrribute(replyCommentTwAreaRight, {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background_color: 'white',
        display: 'block',
        overflow: 'hidden'
    });
    let replyCommentTwAreaRightHead = document.createElement('h3');
    setStyleAtrribute(replyCommentTwAreaRightHead, {
        position: 'relative'
    });

    let headBack = document.createElement('span');
    setStyleAtrribute(headBack, {
        position: 'absolute',
        left: '10px',
        font_size: '20px',
        cursor: 'pointer',
        color: 'white',
        width: '30px',
        height: '20px'
    });
    let iArrow = document.createElement('i');
    setStyleAtrribute(iArrow, {
        border: 'solid #4392A8',
        border_width: '0 3px 3px 0',
        display: 'inline-block',
        padding: '3px',
        transform: 'rotate(135deg)'
    });
    headBack.appendChild(iArrow);

    headBack.addEventListener('click', () => {
        tag.removeChild(document.getElementById(config_web.id_html_area_comment_detail));
    });

    replyCommentTwAreaRightHead.append(headBack);

    let headBackTitle = document.createElement('span');
    headBackTitle.innerText = 'ツイート';
    setStyleAtrribute(headBackTitle, {
        width: '100%',
        padding: '0',
        text_align: 'center',
        font_size: '12px',
        margin: '0 0 10px 0',
        display: 'block'
    });

    replyCommentTwAreaRightHead.append(headBackTitle);

    replyCommentTwAreaRight.appendChild(replyCommentTwAreaRightHead);

    let replyCommentTwAreaRightBoxChat = document.createElement('div');
    replyCommentTwAreaRightBoxChat.id = config_web.id_html_area_comment_detail_box_chat;
    setStyleAtrribute(replyCommentTwAreaRightBoxChat, {
        width: '100%',
        padding: '10px',
        max_height: '400px',
        overflow: 'auto'
    });


    await callApiAwait(config_web.method_get, '/tweet/page', null).then(res => {
        console.log(res, 'after render detail');
    });

    for (let index = 0; index < arrayMessageTwDetail.length; index++) {
        const element = arrayMessageTwDetail[index];
        const newElementMessage = returnMessageChatSpecial(element);
        newElementMessage.addEventListener('click', (e) => {

            document.getElementById(config_web.id_html_area_comment_textarea).value = element.message;
        });
        replyCommentTwAreaRightBoxChat.appendChild(newElementMessage);
    }

    replyCommentTwAreaRight.appendChild(replyCommentTwAreaRightHead);
    replyCommentTwAreaRight.appendChild(replyCommentTwAreaRightBoxChat);

    return replyCommentTwAreaRight;
}
// UI DASHBOARD
var dashBoardUi = async () => {
    var dashboardArea = document.createElement('div');
    dashboardArea.id = config_web.id_html_area_dashboard;

    setStyleAtrribute(dashboardArea, {
        padding: '0 0 20px 0',
        box_shadow: '0 10px 25px #52575D',
        border_radius: '15px',
        width: '100%'
    });
    /*
       1. Container header ->divHead
            1.1 headLeft
                1.1.1 titleHeadLeft
                1.1.2 buttonLogOutHeadLeft
            1.2 divTab
                1.2.1 tabAI
                1.2.2 tabComment
   */
    var divHead = document.createElement('div');
    divHead.style.display = 'flex';

    var headLeft = document.createElement('div');
    setStyleAtrribute(headLeft, {
        width: '50%',
        display: 'flex',
        justify_content: 'space-between',
        align_items: 'center',
        margin: 0,
        padding: '0 10px'
    });

    var titleHeadLeft = returnHeaderAndLogo({ txt: 'AI チャットボット', id: config_web.id_after_login });
    setStyleAtrribute(titleHeadLeft, {
        padding: '0 10px'
    });

    var buttonLogOutHeadLeft = document.createElement('button');
    buttonLogOutHeadLeft.innerText = 'ログアウト';
    setStyleAtrribute(buttonLogOutHeadLeft, {
        padding: '0 10px',
        margin_left: '10px',
        cursor: 'pointer',
        background_color: '#4392A8',
        color: 'white',
        font_size: '10px',
        border_radius: '5px',
        border: 0
    });

    buttonLogOutHeadLeft.addEventListener('click', logoutTw);

    headLeft.appendChild(titleHeadLeft);
    headLeft.appendChild(buttonLogOutHeadLeft);

    divHead.appendChild(headLeft);
    // 1.2 divTab
    var divTab = document.createElement('div');
    divTab.id = 'tab';

    setStyleAtrribute(divTab, {
        width: '50%',
        display: 'flex'
    });

    var tabAI = document.createElement('button');
    tabAI.classList.add('tab-active');
    setStyleAtrribute(tabAI, {
        background_color: 'white',
        width: '50%',
        border: '0',
        display: 'flex',
        justify_content: 'center',
        align_items: 'center',
        height: '40px',
        cursor: 'pointer'
    });

    var imgTabAi = document.createElement('img');
    imgTabAi.id = 'img-tab-ai';
    imgTabAi.src = config_web.icon_message_active;
    setStyleAtrribute(imgTabAi, {
        width: '17px',
        margin_right: '10px'
    });
    tabAI.appendChild(imgTabAi);

    var spanAi = document.createElement('span');
    spanAi.innerText = 'AI チャットボット';
    spanAi.id = 'img-span-ai';
    setStyleAtrribute(spanAi, {
        color: '#4392A8',
        font_size: '10px',
        font_weight: 'bold'
    });
    tabAI.appendChild(spanAi);
    // Tab comment
    var tabComment = document.createElement('button');
    tabComment.classList.add('none-active');

    setStyleAtrribute(tabComment, {
        background_color: '#4392A8',
        width: '50%',
        border: '0',
        display: 'flex',
        justify_content: 'center',
        align_items: 'center',
        height: '40px',
        cursor: 'pointer'
    });

    var imgTabComment = document.createElement('img');
    imgTabComment.src = config_web.icon_tweet;
    setStyleAtrribute(imgTabComment, {
        width: '17px',
        margin_right: '10px'
    });
    tabComment.appendChild(imgTabComment);

    var spanComment = document.createElement('span');
    spanComment.innerText = 'Twitter チャットボット';
    setStyleAtrribute(spanComment, {
        color: 'white',
        font_size: '10px',
        font_weight: 'bold'
    });

    tabComment.appendChild(spanComment);
    // FUN 
    tabComment.addEventListener('click', () => {
        if (tabComment.classList.contains('none-active')) {
            tabComment.classList.remove('none-active');
            tabComment.classList.add('tab-active');
            imgTabComment.src = config_web.icon_tweet_active;
            setStyleAtrribute(tabComment, {
                background_color: 'white'
            });
            setStyleAtrribute(spanComment, {
                color: '#4392A8'
            });
            // Unactive tab comment 
            tabAI.classList.remove('tab-active');
            tabAI.classList.add('none-active');
            setStyleAtrribute(tabAI, {
                background_color: '#4392A8'
            });
            setStyleAtrribute(spanAi, {
                color: 'white'
            });
            imgTabAi.src = config_web.icon_message;
            // change title 
            changePropertyHeader({
                id: config_web.id_after_login,
                txt: 'Twitter チャットボット',
                src: config_web.icon_tweet_active
            });
            // active area
            setStyleAtrribute(boxCommentTwArea, {
                display: 'block'
            });
            setStyleAtrribute(boxAiArea, {
                display: 'none'
            });

            aiAraeLeftTextarea.value = '';
            // reset popup reply
            if (document.getElementById(config_web.id_html_area_comment_detail)) {
                document.getElementById(config_web.id_html_area_comment_right).removeChild(
                    document.getElementById(config_web.id_html_area_comment_detail)
                );
            }
        }
    });

    tabAI.addEventListener('click', () => {
        if (tabAI.classList.contains('none-active')) {
            tabAI.classList.remove('none-active');
            tabAI.classList.add('tab-active');
            imgTabAi.src = config_web.icon_message_active;
            setStyleAtrribute(tabAI, {
                background_color: 'white'
            });
            setStyleAtrribute(spanAi, {
                color: '#4392A8'
            });

            // Unactive tab comment 
            tabComment.classList.remove('tab-active');
            tabComment.classList.add('none-active');
            setStyleAtrribute(tabComment, {
                background_color: '#4392A8'
            });
            setStyleAtrribute(spanComment, {
                color: 'white'
            });
            imgTabComment.src = config_web.icon_tweet;
            // change title 
            changePropertyHeader({
                id: config_web.id_after_login,
                txt: 'AI チャットボット',
                src: config_web.icon_message_active
            });
            // Active area
            setStyleAtrribute(boxCommentTwArea, {
                display: 'none'
            });
            setStyleAtrribute(boxAiArea, {
                display: 'block'
            });
            commentTwAreaLeftTextarea.value = '';
        }
    });
    // AI BOT AREA ******************************************
    var boxAiArea = document.createElement('div');
    boxAiArea.id = config_web.id_html_area_ai;

    var aiArea = document.createElement('div');
    setStyleAtrribute(aiArea, {
        width: '100%',
        display: 'flex',
        justify_content: 'space-beetween'
    });
    //  AI BOT AREA  RIGHT 
    var aiAreaRight = document.createElement('div');
    aiAreaRight.id = 'ai-area-right';
    setStyleAtrribute(aiAreaRight, {
        width: '50%',
        overflow: 'hidden'
    });

    var aiAreaRightBoxChat = document.createElement('div');;
    setStyleAtrribute(aiAreaRightBoxChat, {
        width: '100%',
        padding: '10px',
        max_height: '400px',
        overflow: 'auto'
    });

    const arrayMessage = [
        {
            is_question: false,
            date: '2022.02.10 11:04',
            avatar: config_web.avatar_bot,
            message: 'DAIKO に質問をしてみてください。\nAIがお答えします。※ボックス右上のタグで「AI チャットボット」と「Twitter チャットボット」を切り替えることが出来ます。'
        }
    ];

    for (let index = 0; index < arrayMessage.length; index++) {
        const element = arrayMessage[index];
        const newElementMessage = returnMessageChatNormal(element);
        aiAreaRightBoxChat.appendChild(newElementMessage);
    }

    aiAreaRight.appendChild(aiAreaRightBoxChat);

    //  AI BOT AREA  LEFT 
    var aiAreaLeft = document.createElement('div');
    aiAreaLeft.id = 'ai-area-left';
    setStyleAtrribute(aiAreaLeft, {
        width: '50%',
        padding: '10px'
    });

    var aiAraeLeftHeader = document.createElement('h2');
    aiAraeLeftHeader.id = 'ai-area-left-header';
    aiAraeLeftHeader.innerHTML = `DAIKO に<br>質問をしてみよう！`;
    setStyleAtrribute(aiAraeLeftHeader, {
        font_size: '30px'
    });

    var aiAraeLeftTextarea = document.createElement('textarea');
    aiAraeLeftTextarea.id = 'ai-area-left-textarea';
    aiAraeLeftTextarea.placeholder = `ここに、質問を入力してください。`;
    setStyleAtrribute(aiAraeLeftTextarea, {
        font_size: '10px',
        width: '100%',
        height: '100px',
        resize: 'none',
        border_radius: '10px',
        border: '1px solid  black #cdcdcd',
        padding: '10px'
    });

    var aiAraeLeftButton = document.createElement('button');
    aiAraeLeftButton.id = 'ai-area-left-button';
    aiAraeLeftButton.innerText = `質問を送信する`;
    setStyleAtrribute(aiAraeLeftButton, {
        font_size: '10px',
        width: '100%',
        height: '30px',
        border_radius: '15px',
        border: '0',
        color: 'white',
        padding: '0 10px',
        background_color: '#4392A8',
        cursor: 'pointer'
    });
    aiAraeLeftButton.addEventListener('click', () => {
        const txt = aiAraeLeftTextarea.value;
        if (txt.trim().length > 0) {
            const avatar_url = localStorage.getItem(config_web.tokenTwInfo) ?
                JSON.parse(localStorage.getItem(config_web.tokenTwInfo)).photoURL : config_web.avatar_bot;
            const obj = {
                is_question: true,
                date: convertDate(new Date().getTime()),
                avatar: avatar_url,
                message: txt
            };
            // APPENT TO CHAT
            aiAreaRightBoxChat.appendChild(returnMessageChatNormal(obj));
            aiAreaRightBoxChat.scrollTop = aiAreaRightBoxChat.scrollHeight - aiAreaRightBoxChat.clientHeight;
            aiAraeLeftTextarea.value = '';

            const body = {
                session_id: -1,
                message: txt,
                service_id: 1
            }

            callApi(config_web.method_post, '/ai-bot/comment-suggest', JSON.stringify(body), (res) => {
                const result = JSON.parse(res.responseText);
                if (result.error_code == 0) {
                    const obj_answer = {
                        is_question: false,
                        date: convertDate(new Date().getTime()),
                        avatar: config_web.avatar_bot,
                        message: result.result
                    };
                    aiAreaRightBoxChat.appendChild(returnMessageChatNormal(obj_answer));
                    aiAreaRightBoxChat.scrollTop = aiAreaRightBoxChat.scrollHeight - aiAreaRightBoxChat.clientHeight;
                }
            });

        }
    });

    aiAreaLeft.appendChild(aiAraeLeftHeader);
    aiAreaLeft.appendChild(aiAraeLeftTextarea);
    aiAreaLeft.appendChild(aiAraeLeftButton);


    aiArea.appendChild(aiAreaLeft);
    aiArea.appendChild(aiAreaRight);

    boxAiArea.appendChild(aiArea);
    // END AI BOT AREA ******************************************
    // START TAB TW ******************************************
    var boxCommentTwArea = document.createElement('div');
    boxCommentTwArea.id = config_web.id_html_area_comment;
    setStyleAtrribute(boxCommentTwArea, { display: 'none' });
    var commentTwArea = document.createElement('div');

    setStyleAtrribute(commentTwArea, {
        width: '100%',
        display: 'flex',
        justify_content: 'space-beetween',
    });
    //  AI BOT AREA  RIGHT 
    var commentTwAreaRight = document.createElement('div');
    commentTwAreaRight.id = config_web.id_html_area_comment_right;
    setStyleAtrribute(commentTwAreaRight, {
        width: '50%',
        position: 'relative'
    });


    // COMMENT LIST
    var commentTwAreaRightHead = document.createElement('h3');
    commentTwAreaRightHead.innerText = 'ツイート一覧';
    setStyleAtrribute(commentTwAreaRightHead, {
        width: '100%',
        padding: '0',
        text_align: 'center',
        font_size: '12px',
        margin: '0 0 10px 0'
    });
    commentTwAreaRight.appendChild(commentTwAreaRightHead);

    var commentTwAreaRightBoxChat = document.createElement('div');
    commentTwAreaRightBoxChat.id = 'comment-tw-area-right-boxChat';
    setStyleAtrribute(commentTwAreaRightBoxChat, {
        width: '100%',
        padding: '10px',
        max_height: '400px',
        overflow: 'auto'
    });

    console.log('run');

    await callApiAwait(config_web.method_get, '/tweet/page', null).then(res => {
        console.log('get total page');
        total_page = 5;
    });
    await callApiAwait(config_web.method_get, '/tweet/page', null).then(res => {
        console.log(res, 'after render');
        renderElementComment(commentTwAreaRightBoxChat, commentTwAreaRight, []);
    });

    console.log('after run');

    commentTwAreaRightBoxChat.addEventListener('scroll', (e) => {
        if (e.target.clientHeight + e.target.scrollTop == e.target.scrollHeight && current_page <= total_page) {
            console.log('curent page', current_page);
            showLoading();
            callApi(config_web.method_get, '/ai-bot/tweet?page=' + current_page, null, (calback) => {
                renderElementComment(commentTwAreaRightBoxChat, commentTwAreaRight, []);
                current_page += 1;
                hideLoading();
            });
        }
    });

    commentTwAreaRight.appendChild(commentTwAreaRightBoxChat);

    //  AI BOT AREA  LEFT 
    var commentTwAreaLeft = document.createElement('div');
    commentTwAreaLeft.id = config_web.id_html_area_comment_left;
    setStyleAtrribute(commentTwAreaLeft, {
        width: '50%',
        padding: '10px'
    });

    var commentTwAreaLeftHeader = document.createElement('h2');
    commentTwAreaLeftHeader.id = 'comment-tw-area-left-header';
    commentTwAreaLeftHeader.innerHTML = `DAIKO に<br>コメントをしてみよう！`;
    setStyleAtrribute(commentTwAreaLeftHeader, {
        font_size: '30px'
    });

    var commentTwAreaLeftTextarea = document.createElement('textarea');
    commentTwAreaLeftTextarea.id = config_web.id_html_area_comment_textarea;
    commentTwAreaLeftTextarea.placeholder = `ここに、質問を入力してください。`;
    setStyleAtrribute(commentTwAreaLeftTextarea, {
        font_size: '10px',
        width: '100%',
        height: '100px',
        resize: 'none',
        border_radius: '10px',
        border: '1px solid  black #cdcdcd',
        padding: '10px'
    });

    var commentTwAreaLeftButton = document.createElement('button');
    commentTwAreaLeftButton.id = 'comment-tw-area-left-button';
    commentTwAreaLeftButton.innerText = `　コメントを送信する`;
    setStyleAtrribute(commentTwAreaLeftButton, {
        font_size: '10px',
        width: '100%',
        height: '30px',
        border_radius: '15px',
        border: '0',
        color: 'white',
        padding: '0 10px',
        background_color: '#4392A8',
        cursor: 'pointer'
    });
    commentTwAreaLeftButton.addEventListener('click', () => {
        console.log(1)
        if (document.getElementById(config_web.id_html_area_comment_detail)) {
            const txt = commentTwAreaLeftTextarea.value;
            if (txt.trim().length > 0) {
                const avatar_url = localStorage.getItem(config_web.tokenTwInfo) ?
                    JSON.parse(localStorage.getItem(config_web.tokenTwInfo)).photoURL : config_web.avatar_bot;
                const obj = {
                    is_question: true,
                    date: convertDate(new Date().getTime()),
                    avatar: avatar_url,
                    message: txt
                };
                // APPENT TO CHAT
                document.getElementById(config_web.id_html_area_comment_detail_box_chat).appendChild(returnMessageChatNormal(obj));
                document.getElementById(config_web.id_html_area_comment_detail_box_chat).scrollTop = document.getElementById(config_web.id_html_area_comment_detail_box_chat).scrollHeight - document.getElementById(config_web.id_html_area_comment_detail_box_chat).clientHeight;
                commentTwAreaLeftTextarea.value = '';

                const body = {
                    session_id: -1,
                    message: txt,
                    service_id: 1
                }

                callApi(config_web.method_post, '/ai-bot/comment-suggest', JSON.stringify(body), (res) => {
                    const result = JSON.parse(res.responseText);
                    if (result.error_code == 0) {
                        const obj_answer = {
                            is_question: false,
                            date: convertDate(new Date().getTime()),
                            avatar: config_web.avatar_bot,
                            message: result.result
                        };
                        document.getElementById(config_web.id_html_area_comment_detail_box_chat).appendChild(returnMessageChatNormal(obj_answer));
                        document.getElementById(config_web.id_html_area_comment_detail_box_chat).scrollTop =
                         document.getElementById(config_web.id_html_area_comment_detail_box_chat).scrollHeight - document.getElementById(config_web.id_html_area_comment_detail_box_chat).clientHeight;
                    }
                });
            }
        }

    });


    commentTwAreaLeft.appendChild(commentTwAreaLeftHeader);
    commentTwAreaLeft.appendChild(commentTwAreaLeftTextarea);
    commentTwAreaLeft.appendChild(commentTwAreaLeftButton);

    commentTwArea.appendChild(commentTwAreaLeft);
    commentTwArea.appendChild(commentTwAreaRight);

    boxCommentTwArea.appendChild(commentTwArea);
    divTab.appendChild(tabAI);
    divTab.appendChild(tabComment);

    // Append head 
    divHead.appendChild(divTab);

    dashboardArea.appendChild(divHead);
    dashboardArea.appendChild(boxAiArea);
    dashboardArea.appendChild(boxCommentTwArea);

    return dashboardArea;

}
// END UI HOME
// UI LOGIN AND HANDLE
var loginUi = () => {
    // area 
    var loginArea = document.createElement('div');
    loginArea.id = config_web.id_html_area_login;
    loginArea.style.padding = '20px 20px'
    loginArea.style.boxShadow = '0 10px 25px #52575D';
    loginArea.style.borderRadius = '15px';
    loginArea.style.width = '100%';
    // HEADER 
    loginArea.appendChild(returnHeaderAndLogo({ txt: 'AI チャットボット', id: 'header-none-login' }));
    // TEXT DESCRIPTION

    var description = document.createElement('p');
    description.innerHTML = `ツイッターにログインしていませんので、ご利用前にログインしてください`;
    description.style.textAlign = 'center';
    // Parrent append
    loginArea.appendChild(description);
    // BUTTON LOGIN
    var buttonLogin = document.createElement('button');
    buttonLogin.id = 'login-area-btn';

    setStyleAtrribute(buttonLogin, {
        background_color: '#4392A8',
        border_radius: '5px',
        border: '0',
        display: 'flex',
        justify_content: 'center',
        align_items: 'center',
        height: '30px',
        margin: '20px auto',
        cursor: 'pointer'
    });


    var imgTwitter = document.createElement('img');
    imgTwitter.src = config_web.icon_tweet;
    imgTwitter.style.width = '20px';
    imgTwitter.style.marginRight = '10px';
    buttonLogin.appendChild(imgTwitter);

    var headSpan = document.createElement('span');
    headSpan.innerText = 'AI Twitterログイン';
    setStyleAtrribute(headSpan, {
        color: 'white',
        font_weight: 'bold',
        font_size: '12px'
    });
    buttonLogin.appendChild(headSpan);
    buttonLogin.addEventListener('click', loginTw);
    // Parrent append
    loginArea.appendChild(buttonLogin);

    return loginArea;
}
var loginTw = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(AUTH, provider)
        .then((ressult) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            console.log(ressult);
            const credential = TwitterAuthProvider.credentialFromResult(ressult);
            const token = credential.accessToken;
            const secret = credential.secret;
            // The signed-in user info.
            const user = ressult.user;
            console.log('token', token);
            console.log('token', secret);
            console.log('user', user);

            localStorage.setItem(config_web.tokenTw, `${token}:${secret}`);
            localStorage.setItem(config_web.tokenTwInfo, JSON.stringify(user));

            if (user && token && secret) {
                onloadEmbed();
            }

            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        });
}
var logoutTw = () => {
    signOut(AUTH).then(() => {
        localStorage.removeItem(config_web.tokenTw);
        localStorage.removeItem(config_web.tokenTwInfo);
        onloadEmbed();
    }).catch((error) => {
        localStorage.removeItem(config_web.tokenTw);
        localStorage.removeItem(config_web.tokenTwInfo);
        onloadEmbed();
        console.log(2);
    });
}
//END UI LOGIN AND HANDLE  
async function onloadEmbed() {
    const TOKEN = localStorage.getItem(config_web.tokenTw);
    const USER_INFO = localStorage.getItem(config_web.tokenTw);

    if (EMBED_AREA) {

        if (TOKEN && USER_INFO) {
            if (document.getElementById(config_web.id_html_area_login)) {
                EMBED_AREA.removeChild(document.getElementById(config_web.id_html_area_login));
            }
            await dashBoardUi().then(res => {
                EMBED_AREA.appendChild(res);
            });
            // console.log(abc);
        } else {
            if (document.getElementById(config_web.id_html_area_dashboard)) {
                EMBED_AREA.removeChild(document.getElementById(config_web.id_html_area_dashboard));
            }
            EMBED_AREA.appendChild(loginUi());
        }
    }
}

onloadEmbed();










//模拟评论数据
const comment = {
    status: "成功",
    code: 200,
    data: [{
            id: 'comment0001', //主键id == id
            createTime: '2018-07-05 08:30', //评论时间 == createTime
            postId: 'talents100020', //文章的id == postId
            commenterId: 'errhefe232213', //评论者id  == commenterId
            commenterNickname: '犀利的评论家', //评论者昵称 == commenterNickname
            // == commenterAvatar
            commenterAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //评论者头像
            like: 3, //点赞人数 == like
            content: '非常靠谱的程序员', //评论内容 == content
            isLiked: true, //是否点赞 == isLiked
            reply: [ //回复，或子评论  == reply
                {
                    id: '34523244545', //主键id == id
                    fatherId: 'comment0001', //父评论id，即父亲的id == fatherId
                    replierId: 'observer223432', //回复者id  == replierId
                    replierNickname: '夕阳红', //回复者昵称  == replierNickname
                    // == replierAvatar
                    replierAvatar: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg', //评论者头像
                    commenterId: 'errhefe232213', //评论者id == commenterId
                    commenterNickname: '犀利的评论家', //评论者昵称  == commenterNickname
                    // == commenterAvatar
                    commenterAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //被评论者头像
                    content: '赞同，很靠谱，水平很高', //评论内容 == content
                    createTime: '2018-07-05 08:35' //评论时间 == createTime
                },
                {
                    id: '34523244545',
                    fatherId: 'comment0001',
                    replierId: 'observer567422',
                    replierNickname: '清晨一缕阳光',
                    replierAvatar: 'http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg',
                    commenterId: 'observer223432',
                    commenterNickname: '夕阳红',
                    commenterAvatar: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg',
                    content: '大神一个！',
                    createTime: '2018-07-05 08:50'
                }
            ]
        },
        {
            id: 'comment0002',
            createTime: '2018-07-05 08:30',
            postId: 'talents100020',
            commenterId: 'errhefe232213',
            commenterNickname: '毒蛇郭德纲',
            commenterAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
            like: 3,
            content: '从没见过这么优秀的人',
            isLiked: true,
            reply: []
        }
    ]
};

export {
    comment
}
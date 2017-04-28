(function(){
    let phone    = null;
    const vidbox = $('#vid-box');
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Form Login
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    $('#loginForm').submit( event => {
        if (phone) phone.hangup();
        else phone = PHONE({
            number        : $('#username').val() || 'Anonymous'
        ,   ssl           : true
        ,   publish_key   : 'pub-c-561a7378-fa06-4c50-a331-5c0056d0163c'
        ,   subscribe_key : 'sub-c-17b7db8a-3915-11e4-9868-02ee2ddab7fe'
        });
        phone.debug( info => { console.log(info) } );
        phone.unable( error => { alert('unable to connect') } );
        phone.ready( session => {
            $('#username').css( 'background', '#55ff5b' );
        } );
        phone.receive(function(session){
            session.ended( session => { vidbox.html('') } );
            session.connected( session => {
                vidbox.append(session.video);
            });
        });
        return false;
    } );
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Form Call
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    $('#callForm').submit( event => {
        if (!window.phone) alert('Login First!');
        else phone.dial($('#number').val());
        return false;
    } );
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Form Hangup
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    $('#hangupForm').submit( event => {
        if (phone) phone.hangup();
        return false;
    } );
})();
import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import global from '../../global';
import css from '../../css';
import SvgIcon from '../../components/svgIcon';

const PrivacyPolicy = (props) => {

    return(
        <View style={styles.bgContainer}>
            <View style={styles.header}>
                <Pressable style={css.backButton} onPress={() => props.navigation.navigate('Settings')}>
                    <SvgIcon icon='Back'/>
                </Pressable>
                <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>PRIVACY POLICY</Text>
            </View>
            <ScrollView style={{ paddingHorizontal: 5 }}>
                <Text>RUNROOM PRIVACY POLICY</Text>
                <Text>August 1, 2021</Text>
                <Text>
                    This Privacy Policy has been developed in line with RUNROOM’s 
                    commitment to privacy and describes how RUNROOM treat the information 
                    it collects and shares when you use the mobile RUNROOM application, 
                    hereinafter referred to as the “App”, owned and operated by the Delaware 
                    Corporation Metomine LLC, hereinafter referred to as “RUNROOM” or 
                    “we”, “us” or “our”.
                </Text>
                <Text>
                    This Privacy Policy is effective immediately for users registering an 
                    RUNROOM accounts after the date of last update hereinabove and will 
                    become effective 30 days after said date for pre-existing users.
                </Text>
                <Text>
                    By visiting the App, you are accepting this Privacy Policy. As the App will 
                    develop and evolve over time, this Privacy Policy may change to reflect that. 
                    Your continued use of the App following the effective date hereinabove 
                    means you accept the changes. You agree that notices we may provide on 
                    the App itself shall be deemed reasonable notice for this purpose. It is your 
                    responsibility to check periodically for any changes we may make to this 
                    Privacy Policy.
                </Text>
                <Text>1. Collected and Disclosed Information</Text>
                <Text>
                    1.1 RUNROOM may request information from you in order to grant you 
                    access to selected content of the App. RUNROOM may use this information 
                    to contact you regarding your relationship with the App and to provide 
                    services that you have requested. RUNROOM may share your information
                    with vendors we select as necessary to provide products or services you 
                    have requested or to provide information about products or services that 
                    may be of interest to you.
                </Text>
                <Text>
                    1.2 Other than as stated in this Privacy Policy, your personal information 
                    will not be used for promotional purposes without your consent. However, 
                    if you choose to fill out any user surveys, or participate in a contest, 
                    demographic information that you submit about yourself may be shared 
                    with associated sponsors and business partners in aggregate form.
                </Text>
                <Text>
                    1.3 Information collected in aggregate form includes the number of visitors 
                    to the App, how long they stay, the pages they visit, the trails and locations 
                    they select, anonymized review content and trail share statistics.
                    RUNROOM collects these kinds of aggregate user information to help
                    continually improve content and services, and to sell sponsorships of the 
                    App to appropriate advertisers. This aggregate user information is disclosed 
                    to advertisers, but note that advertisers do not have any influence over the 
                    editorial content or reviews that appear on the App. In addition, RUNROOM
                    collects in aggregate form information from visitors who click on 
                    advertisements to enable measurement of interest in the various areas of 
                    the App and inform advertisers as to how many visitors have seen or clicked 
                    on their ads. RUNROOM also uses demographic and preference information 
                    in aggregate form only to allow advertising banners on the App to be
                    targeted to the readers for whom they are most pertinent.
                </Text>
                <Text>
                    1.4 RUNROOM cooperates with all law-enforcement inquiries, official 
                    investigations and legal proceedings initiated by governmental and/or law 
                    enforcement officials, and reserves the right to disclose personally 
                    identifying and/or aggregate information in connection with a subpoena or 
                    other court-sanctioned demand for such information.
                </Text>
                <Text>
                    1.5 Nothing in this Privacy Policy is meant to impede RUNROOM’s right or 
                    ability to transfer, sell or otherwise dispose of any of its assets. RUNROOM
                    reserves the right to share your information with any successor to 
                    RUNROOM’s business, subject to acceptance by said any successor of all 
                    obligations under this Privacy Policy.
                </Text>
                <Text>
                    1.6 RUNROOM reserves the right to use the information it collects about 
                    your computer, mobile or other device (including its geographical location), 
                    which may at times be able to identify you, for any lawful business purpose, 
                    including, without limitation, to help diagnosis problems with its servers, to 
                    gather broad demographic information, analyse trends, track users' 
                    movements around the App and to otherwise administer the App. 
                    Geographic location information about you and/or your computer, mobile 
                    or other device may specifically be used to show you content and sponsored 
                    messaging based on geographic location. RUNROOM reserves the right to 
                    use, transfer, sell and share aggregated anonymous data about its users as 
                    a group for any lawful business purpose, such as analysing usage trends and 
                    seeking compatible advertisers, sponsors, clients and customers.
                </Text>
                <Text>2. IP Addresses; Cookies and Other Tracking Technology</Text>
                <Text>
                    2.1 RUNROOM logs IP (Internet Protocol) addresses, or the location of your 
                    computer on the Internet, for systems administration and troubleshooting 
                    purposes. RUNROOM uses the IP address log in an aggregate fashion to 
                    track access to the App.
                </Text>
                <Text>
                    2.2 As is standard practice on many web Apps, the App uses “cookies” and 
                    other similar technologies such as clear gifs (collectively "Local Device 
                    Storage") to recognize you and provide personalization, as well as to help 
                    understand which parts of the App are the most popular, where its visitors 
                    are going, and how much time they spend there. RUNROOM reserves the 
                    right to place cookies on your computer with unique anonymous numbers 
                    for purposes such as to ensure that your browser does not see the same ad 
                    repeatedly, to sequence ads in a series, and to measure the number of 
                    unique visitors that have viewed a particular ad/or visited a particular web 
                    page. You may decline Local Device Storage by using the appropriate feature 
                    of your web software, if available; however, declining to use Local Device 
                    Storage may impede the ability of the App to function properly.
                </Text>
                <Text>
                    2.3 In addition, RUNROOM may use a third-party advertising company to 
                    serve ads when you visit the App. This company may use information (not 
                    including your name, address, e-mail address, or telephone number) about 
                    your visit to the App, including IP address, in order to provide
                    advertisements about products and services that may be of interest to you. 
                    While serving advertisements to the App, said third-party advertiser may 
                    place or recognize a unique cookie on your browser
                </Text>
                <Text>
                    2.4 In addition to Local Device Storage, RUNROOM may use web beacons, 
                    web bugs and similar technologies (collectively, together with Local Device 
                    Storage, the "Tracking Technologies"). Tracking Technologies are used for 
                    all or some of the same lawful business purposes we described hereinbefore 
                    for the use of Local Device Storage.
                </Text>
                <Text>3. User Generated Content</Text>
                <Text>
                    Please remember that any personal information you disclose in e.g. user
                    reviews becomes public information and you should exercise caution when
                    deciding to disclose your personal information. If you send e-mails, you 
                    should be aware that information disclosed in e-mails may not be secure or 
                    encrypted and, thus, may be available to others. We suggest that you 
                    exercise caution when deciding to disclose any personal or confidential 
                    information in e-mails or via the Internet.
                </Text>
                <Text>4. E-mails</Text>
                <Text>
                    4.1 RUNROOM will use your e-mail address to respond directly to your 
                    questions or comments. Except to provide you with products and services 
                    you have requested, RUNROOM will not share, sell, rent, swap or authorize 
                    any third party to use your e-mail address without providing you the 
                    opportunity to opt-out of such use. If it is ever requested that you volunteer 
                    additional information, such as age (e.g., in an online survey), your response 
                    will always be voluntary. You can unsubscribe to any e-mail you receive
                    from RUNROOM by following the instructions in the e-mail. If you feel you 
                    have received an e-mail from us in error, please contact team@runroomapp.com
                </Text>
                <Text>
                    4.2 Account and Service-Related E-mails
                    RUNROOM reserves the right to send you e-mails relating to your account 
                    status. This includes order confirmations, renewal/expiration notices,
                    notices of credit-card problems, other transactional e-mails and 
                    notifications about major changes to the App and/or to this Privacy Policy. 
                    If you have registered for online discussions or other services, you may 
                    receive e-mails specific to your participation in those activities. If you
                    participate in an online survey, or submit a sweepstakes or contest entry, 
                    you may receive a confirmation e-mail.
                </Text>
                <Text>
                    4.3 Promotional E-mails
                    Certain parts of the App may give you the option to receive periodic emails
                    from RUNROOM about products and services it considers may be of interest 
                    to you. If you opt-in to receive these e-mails, you can choose not to receive 
                    additional messages in the future by following the instructions in the emails.
                </Text>
                <Text>
                    4.4 Survey E-mails
                    RUNROOM may send you an e-mail inviting you to participate in user 
                    surveys, asking for feedback on the App and existing or prospective 
                    products and services, as well as information to better understand our 
                    users. User surveys greatly help us to improve the App, and any information 
                    so obtained will not be shared with third parties, except in aggregate and 
                    anonymized form.
                </Text>
                <Text>5. Social Networking Service</Text>
                <Text>
                    If you choose to access, visit and/or use any third-party social networking 
                    service(s) that may be integrated with the App, RUNROOM may receive 
                    personally identifiable information and other information about you and 
                    your computer, mobile or other device that you may have made available 
                    to those services, including information about your contacts on those 
                    services. For example, some social networking services allow you to push 
                    content from our App to your contacts or to pool information about your 
                    contacts so you can connect with them on or through our App. Some social 
                    networking services also will facilitate your registration for the App or 
                    enhance or personalize your experience on the App. Your decision to use a 
                    social networking service in connection with the App is voluntary. However, 
                    you should make sure you are comfortable with the information your third-party social networking services may make available to the App by visiting 
                    those service(s) privacy policies and/or modifying your privacy setting 
                    directly with those services. RUNROOM applies the terms of this Privacy 
                    Policy to all personally identifiable information and other information about 
                    you and your computer, mobile or other device that it receives through 
                    third-party social networking services.
                </Text>
                <Text>6. Third-Party Web Apps</Text>
                <Text>
                    6.1 The App contains links to other web Apps that are not under our 
                    control, even though some of them may feature the RUNROOM logo 
                    through a marketing agreement with us. RUNROOM cannot be held 
                    responsible for the privacy practices of third parties. This Privacy Policy does 
                    not cover information collected elsewhere, including, without limitation, 
                    offline and online Apps, applications, destinations, or services linked to or 
                    from the App. It is recommended that you review the privacy policy of any 
                    web App you visit.
                </Text>
                <Text>
                    6.2 On occasion, RUNROOM sponsors special promotions, sweepstakes, 
                    and contests that are hosted by partner web Apps, which may require that 
                    your browser accept cookies, or that you agree to receive information from 
                    such sponsors. Please note that 6.1 is fully applicable to said partner web 
                    Apps.
                </Text>
                <Text>7. Security</Text>
                <Text>
                    RUNROOM takes highly serious security measures designed to guard access 
                    to information, data quality, and physical security of servers where 
                    information is stored. The App has security measures in place to help 
                    protect against the loss, misuse, and alteration of the information under our 
                    control and uses encryption technology where appropriate. RUNROOM
                    cannot, however, guarantee the confidentiality of any communication 
                    transmitted to or from RUNROOM via the App or e-mails. Accordingly, 
                    RUNROOM is not responsible for the security of information transmitted via 
                    the Internet.
                </Text>
                <Text>8. Notice to California Residents</Text>
                <Text>
                    California Civil Code Section 179883 permits California residents to request 
                    certain information regarding the disclosure of personal information to 
                    third parties for direct marketing purposes. To make such a request, please 
                    contact RUNROOM at team@runroom-app.com.
                </Text>
                <Text>9. Transfer of Information</Text>
                <Text>
                    Your information may be transferred to and maintained on, servers and 
                    databases located outside of your state, providence, country or other 
                    governmental jurisdiction where the privacy laws may not be as protective 
                    as your jurisdiction. Please be advised that RUNROOM may transfer your
                    information to and from any state, province, country, or other 
                    governmental jurisdiction, and process it in the United States or elsewhere. 
                    Your consent to this Privacy Policy followed by your submission of such 
                    information represents your agreement to any such transfer.
                </Text>
                <Text>10. Information Security and Notification</Text>
                <Text>
                    10.1 Because no data transmission is completely secure, and no system of 
                    physical or electronic security is impenetrable, RUNROOM cannot guaranty 
                    the security of the information you submit or the security of servers, 
                    networks or databases, and by using the App, you agree to assume all risk 
                    in connection with the information submitted to or collected by RUNROOM
                    when you access, visit and/or use the App including, without limitation, your 
                    personally identifiable information, and RUNROOM is not responsible for 
                    any loss of such information or the consequences thereof.
                </Text>
                <Text>
                    10.2 Should you elect to store information, such as your personally 
                    identifiable information where others may access it, RUNROOM is not 
                    responsible for any loss of such information or the consequences thereof. If 
                    you lose a computer, mobile or other device that contains your personally 
                    identifiable information, it is up to you to take all the steps necessary to 
                    avoid or protect yourself.
                </Text>
                <Text>
                    10.3 In the unlikely event that we believe that the security of your 
                    information in RUNROOM’s possession or control may have been 
                    compromised, RUNROOM may seek to notify you via your computer, mobile 
                    or other device.
                </Text>
                <Text>11. RUNROOM Contact</Text>
                <Text>
                    You can contact RUNROOM regarding this Privacy Policy by mail at
                    team@runroom-app.com.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: global.CONSTANTS.SPACE_55,
    },
    header: {
        paddingHorizontal: global.CONSTANTS.SIZE_20,
        marginBottom: 10,
    }
});

export default PrivacyPolicy;
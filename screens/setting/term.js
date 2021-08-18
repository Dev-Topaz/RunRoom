import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import global from '../../global';
import css from '../../css';
import SvgIcon from '../../components/svgIcon';

const TermsAndConditions = (props) => {

    const [zoom, setZoom] = useState(1);

    const pressMinusAction = () => {
        if(zoom > 1)
            setZoom(zoom => zoom - 0.1);
    }

    const pressPlusAction = () => {
        if(zoom < 2)
            setZoom(zoom => zoom + 0.1);
    }

    return(
        <View style={styles.bgContainer}>
            <View style={styles.header}>
                <Pressable style={css.backButton} onPress={() => props.navigation.navigate('Settings')}>
                    <SvgIcon icon='Back'/>
                </Pressable>
                <Text style={[css.titleText, { color: global.COLOR.PRIMARY100 }]}>TERMS AND CONDITIONS</Text>
            </View>
            <ScrollView style={styles.docContainer}>
                <Text style={[styles.docTitle, { fontSize: 18 * zoom }]}>RUNROOM TERMS AND CONDITIONS</Text>
                <Text style={[styles.docDate, { fontSize: 16 * zoom }]}>Last updated on August 1, 2021</Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>1. Important Introduction</Text>
                <Text style={[styles.docParagraph, { fontSize: 14 * zoom, lineHeight: 18 * zoom }]}>
                    1.1 These terms and conditions are effective immediately for users 
                    registering an RUNROOM account after the date of last update hereinabove 
                    and will become effective 30 days after said date for pre-existing users. 
                    These are the App terms and conditions ("Terms"), which apply to the use 
                    by end users of the RUNROOM App, hereinafter referred to as the “App”, 
                    owned and operated by the Delaware Corporation Metomine LLC, 
                    hereinafter referred to as “RUNROOM” or “we”, “us” or “our”.
                </Text>
                <Text>
                    1.2 By accessing the App you agree to be bound by: (i) the Terms; and (ii) 
                    the RUNROOM Privacy Policy, which is found on the App and incorporated 
                    herein for reference. If you do not agree to the Terms or the RUNROOM 
                    Privacy Policy you are not entitled to enter the App.
                </Text>
                <Text>
                    1.3 The Terms constitute an agreement between us and contain the entire 
                    terms of your use of the App and all matters which are referred to herein. 
                    The Terms supersede any prior written or oral agreement between us 
                    relating to such matters. We may change the Terms from time to time in 
                    our sole discretion and your continued use of the App following the 
                    effective date hereinabove means you agree to be bound by such changes. 
                    You agree that notices we may provide on the App itself shall be deemed 
                    reasonable notice for this purpose. It is your responsibility to check 
                    periodically for any changes we may make to the Terms. Nothing in the 
                    Terms shall be deemed to confer any third-party rights or benefits.
                </Text>
                <Text>
                    1.4 You confirm that, in agreeing to accept the Terms, you have not relied 
                    on any representation that is not expressly included in the Terms. You may 
                    only use the App for your personal and non-commercial use.
                </Text>
                <Text>
                    1.5 The App is controlled and offered by RUNROOM from its facilities in the 
                    United States of America. Those who access or use the App for other 
                    jurisdictions do so at their own volition and are responsible for compliance 
                    with local law.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>2. Grant of License</Text>
                <Text>
                    This Agreement provides you with a personal, revocable, non-exclusive, 
                    non-transferable license to use as end-user the App subject to your 
                    continued compliance with the Terms. You may print and download 
                    materials and information on the App solely for personal and noncommercial use, provided that all hard copies contain all copyright and 
                    other applicable notices contained in such materials and information. 
                    Except as otherwise expressly permitted herein, you may not modify, copy, 
                    distribute, broadcast, transmit, reproduce, publish, license, transfer, sell, 
                    scrape, mirror, frame, or otherwise use any information or material 
                    obtained from or through the App. As a further condition of use of the App, 
                    you warrant to RUNROOM that you will not use the App for any purpose 
                    that is unlawful, prohibited by any applicable regulation or is otherwise 
                    inconsistent with the Terms.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>3. User accounts</Text>
                <Text>
                    3.1 In order to use some parts of the App, you may need to create an 
                    account. You must never use the account of another user without obtaining 
                    their prior consent. You must provide full and accurate information when 
                    you create your account with us. You are solely responsible for the activity 
                    that occurs on your account, and so we suggest that you keep your account 
                    password secure. You must notify us immediately if you are aware of any 
                    unauthorized use of your account.
                </Text>
                <Text>
                    3.2 When joining RUNROOM via a user account you will be asked to create 
                    an account which you can do via a number of social network accounts or 
                    with an email address and secure password. When logging in or creating an 
                    account via a social network a RUNROOM appointed supplier will ask the 
                    nominated application for permission to access selected data, which 
                    enables the service to work. This data is stored by RUNROOM against your 
                    profile. When you login to the App using social networks the application will 
                    check for any changes to your personal information stored by the App and 
                    update your App profile accordingly. If you choose to delete your App
                    account all your data is deleted from the App immediately.
                </Text>
                <Text>
                    3.3 Please review the RUNROOM Privacy Policy for details of the 
                    management of other collection of personal data.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>4. User submissions</Text>
                <Text>
                    4.1 We may now or in the future allow the submission to the App of
                    photographic material and/or other communications by users of the App
                    (collectively "User Submissions"). User Submissions must always comply
                    with the Terms and with any separate terms and conditions relating to such 
                    User Submissions that we may publish on the App from time to time.
                </Text>
                <Text>
                    4.2 As a specific User Submission a review is your description of the 
                    experience you had with friends, family or on your own at a restaurant, 
                    event, bar, venue, attraction, or exhibition. We encourage reviews that are 
                    informative, entertaining, and helpful for others and an explanation of what 
                    you enjoyed or didn’t. By submitting a review to the App you agree that the 
                    review is based on your own experience and is your genuine opinion, that 
                    you have no personal or business relationship with what you are reviewing 
                    and have not been offered any incentive or payment to write your review.
                    You agree that you understand that the App has a zero-tolerance policy on 
                    fake reviews.
                </Text>
                <Text>
                    4.3 By submitting User Submissions to the App you hereby grant:
                    (a) to RUNROOM a worldwide, royalty-free, perpetual, transferable, 
                    irrevocable, non-exclusive license and right to use, reproduce, share, copy, 
                    modify, publish, edit, translate, reformat, host, aggregate, distribute, 
                    perform, and display the User Submission alone or as part of other works in 
                    any form, media, or technology whether now known or hereafter 
                    developed without territorial or time limitations, and to sublicense such 
                    rights through multiple tiers of sub-licensees.; and
                    (b) to each user of the App, an irrevocable, perpetual, worldwide, nonexclusive, royalty-free, license to access the User Submissions through the 
                    App.
                </Text>
                <Text>
                    4.4 By submitting User Submissions to the App you warrant, represent and 
                    undertake to us that you have full power and authority to grant the rights 
                    and licenses relating to the User Submissions set out in this Agreement and 
                    the User Submissions you submit:
                    (i) do not infringe any third party's intellectual property rights (including 
                    without limitation copyright and/or trademarks), other proprietary rights or 
                    rights of publicity or privacy;
                    (ii) do not violate any law, statute, ordinance or regulation;
                    (iii) are not defamatory, libellous, unlawfully threatening or unlawfully 
                    harassing;
                    (iv) are not obscene or pornographic;
                    (v) do not violate any laws regarding unfair competition, antidiscrimination or false advertising;
                    (vi) do not include e-mail addresses, URLs or phone numbers or any other 
                    Personal Identifiable Information; and
                    (vii) are not a report of someone else's experience.
                </Text>
                <Text>
                    4.5 RUNROOM users like you rely on both our reviews and other users 
                    reviews when looking for inspiration and how to get the best out of the city. 
                    Helpful reviews should be:
                    a) user-friendly - not contain any profanity, threats, prejudiced comments, 
                    hate speech, sexually explicit language, or other content that is not 
                    appropriate for other users;
                    b) those that detail first-hand experiences;
                    c) unique and independent - you should write one review on any given 
                    event, restaurant, or attraction;
                    d) original - no substantially quoted material from other sources, including 
                    (but not limited to) webApps, e-mail correspondence, other reviews, etc;
                    e) non-commercial - no promotional material of any kind, including selfpromotional URLs (we reserve the right to reject any URL, e-mail address, 
                    or phone number for any reason);
                    f) submitted by persons over the age of 13;
                    g) submitted with a valid e-mail address; and
                    h) submitted with no HTML tags and no excessive ALL CAPS, slang, or 
                    typographic symbols.
                </Text>
                <Text>
                    4.6 We do not endorse any User Submission or any opinion, recommendation, or advice expressed therein, and we expressly disclaim any and all 
                    liability in connection with User Submissions.
                </Text>
                <Text>
                    4.7 We do not permit copyright infringing activities or any infringement of 
                    any other intellectual property rights on the App. We reserve the right to 
                    remove the User Submissions without notice for any reason in our absolute 
                    discretion, including, without limitation, breach of the Terms and/or breach 
                    of any intellectual property rights.
                </Text>
                <Text>
                    4.8 We allow the management or representatives of events, venues, 
                    restaurants or attractions to respond to reviews written by users on the App
                    and these should be identified by your user account. We reserve the right 
                    to remove a review or management response at any time for any reason.
                </Text>
                <Text>
                    4.9 If you believe any of the User Submissions on the App are inaccurate, 
                    offensive, indecent, objectionable or infringe any intellectual property 
                    rights please contact us at team@runroom-app.com.
                </Text>
                <Text>
                    4.10 You acknowledge that when using the App, you may be exposed to 
                    User Submissions from a variety of sources, and that we are not responsible 
                    for the accuracy, usefulness, safety, or intellectual property rights of or 
                    relating to such User Submissions. You further understand and acknowledge 
                    that you may be exposed to User Submissions that are inaccurate, offensive, 
                    indecent, or objectionable, and you agree to waive, and hereby do waive, 
                    any legal or equitable rights or remedies you have or may have against us 
                    with respect thereto.
                </Text>
                <Text>
                    4.11 We encourage you to share your opinion about any feature or review 
                    on the App written by us or by one of our users. We appreciate comments 
                    that are your view of another’s opinion and are constructive - be that 
                    agreeing or disagreeing.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>5. Communications and Electronic Signatures</Text>
                <Text>
                    You agree to accept all communications from RUNROOM regarding use of 
                    the App at the addresses you provide to RUNROOM. RUNROOM is entitled 
                    to rely on the e-mail address and mailing address that you last provided to 
                    us. You agree to waive all claims resulting from failure to receive 
                    communications because of changes in your e-mail address or mailing 
                    address not communicated to RUNROOM. You agree to be bound by any 
                    affirmance, assent, or agreement you transmit through the App. You agree 
                    that, when in the future you visit the App, your agreement or consent to 
                    these Terms will be legally binding and enforceable and will be the legal 
                    equivalent of your handwritten signature.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>6. Intellectual Property Rights</Text>
                <Text>
                    6.1 All material contained on this App, unless otherwise indicated, is 
                    protected by law to the fullest extent possible including, but not limited to, 
                    United States copyright, trade secret, and trademark law, as well as other 
                    state, national, and international laws and regulations. Except as expressly 
                    provided for in this Agreement, nothing contained on the App shall be 
                    construed as granting a license or other rights to you in any intellectual 
                    property of RUNROOM or any third party.
                </Text>
                <Text>
                    6.2 Copyright, trademark, and other proprietary rights in the App, or 
                    portions thereof, may be held by third parties. Such third-party intellectual 
                    property rights may not be used without the prior written permission of 
                    their respective owners. Removing or altering the copyright notice and any 
                    other proprietary notice on any material on this App is strictly prohibited.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>7. Privacy Policy</Text>
                <Text>
                    Please see the RUNROOM Privacy Policy for a summary of our practices 
                    regarding the collection and use of non-public personal information. 
                    Acceptance of the Terms constitutes consent to the terms, covenants, 
                    conditions, and provisions of the RUNROOM Privacy Policy.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>8. Code of Conduct</Text>
                <Text>
                    You may not, nor may you allow others to, directly or indirectly, do any of 
                    the following:
                </Text>
                <Text>
                    (a) Attempt to or actually disrupt, impair or interfere with the operation 
                    of, alter or modify the App or any content thereof. This includes, without 
                    limitation, interfering with, defeating, or circumventing any security 
                    function of the App, or attempting to do so.
                </Text>
                <Text>
                    (b) Collect or attempt to collect any information about others, including, 
                    but not limited to passwords, account or other information.
                </Text>
                <Text>
                    (c) Restrict or inhibit any other authorized user from using and enjoying 
                    the App. This includes, without limitation
                    (i) using, or attempting to use, any account without the user’s 
                    permission; and
                    (ii) obtaining or soliciting another user’s password or other personal 
                    information under false pretences.
                </Text>
                <Text>
                    (d) Post, store, or transmit any knowingly inaccurate or misleading 
                    personal information.
                </Text>
                <Text>
                    (e) Post, store, or transmit any unlawful, threatening, defamatory, 
                    obscene, inflammatory, pornographic, profane, or otherwise objectionable 
                    (as determined by RUNROOM) information or material.
                </Text>
                <Text>
                    (f) Post, store, or transmit any information or material that could 
                    constitute or encourage conduct that would be considered a criminal 
                    offense, give rise to civil liability, or otherwise violate any law.
                </Text>
                <Text>
                    (g) Post, store, or transmit any information or software that contains a 
                    virus, worm, Trojan horse, or other harmful or disruptive component.
                </Text>
                <Text>
                    (h) Except as expressly permitted herein or on the App, modify, adapt, 
                    sublicense, translate, resell, retransmit, reverse engineer, decompile or 
                    disassemble any portion of the App.
                </Text>
                <Text>
                    (i) Post, store, or transmit materials in violation of a third party’s copyright 
                    or other intellectual property contractual or proprietary rights. You are 
                    solely responsible for determining whether any material you post, store, or 
                    transmit is subject to a third party’s rights.
                </Text>
                <Text>
                    (j) Use the App for any unlawful purpose.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>9. Assumption of Risk</Text>
                <Text>
                    Use of the Internet and the App is solely at your own risk and is subject to 
                    all applicable local, state, national, and international laws and regulations. 
                    While RUNROOM has endeavoured to create a secure and reliable App, 
                    please be advised that the confidentiality of any communication or material 
                    transmitted to/from the App over the Internet cannot be guaranteed. 
                    Accordingly, RUNROOM and its employees, agents, directors, officers, 
                    proprietors, partners, representatives, shareholders, attorneys, 
                    predecessors, successors, and assigns are not responsible for the security of 
                    any information transmitted via the Internet. You assume sole and 
                    complete risk for using the App and must make your own determination as 
                    to these matters.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>10. Law Enforcement</Text>
                <Text>
                    RUNROOM reserves the right to view, monitor, and record activity on the 
                    App without notice or permission from you. Any information obtained by 
                    monitoring, reviewing, or recording is subject to review by law enforcement 
                    organizations in connection with investigation or prosecution of possible 
                    criminal activity on the App. RUNROOM will also comply with all court 
                    orders involving requests for such information.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>11. Links to Other Apps</Text>
                <Text>
                    RUNROOM may offer links to third-party webApps that may offer various 
                    products, services, and/or information. Users should be aware that use of 
                    these third-party webApps may be subject to separate terms and 
                    conditions, information collection practices, and other provisions. We
                    cannot ensure that users will be satisfied with any products or services 
                    offered and/or purchased from such third-party webApps. RUNROOM does 
                    not endorse any of the products or services offered in any third-party 
                    webApps. Furthermore, RUNROOM has not taken any steps to confirm the 
                    correctness, accuracy, or reliability of any information contained in any 
                    third-party web Apps. Before proceeding with any transaction with any 
                    third-party webApp, whether the transaction is on-line or off-line, it shall be 
                    your sole responsibility to conduct whatever investigation you deem 
                    necessary and appropriate.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>12. Events Beyond the Control of TrailStep</Text>
                <Text>
                    You expressly absolve and release RUNROOM from any claim of harm 
                    resulting from a cause beyond the control of RUNROOM including, but not 
                    limited to, failure of electronic or mechanical equipment or communication 
                    lines, telephone or other interconnect problems, computer viruses, 
                    unauthorized access, theft, operator errors, severe weather, earthquakes, 
                    natural disasters, strikes or other labor problems, wars, terrorism, or 
                    governmental restrictions.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>13. DISCLAIMERS</Text>
                <Text>
                    WHILE RUNROOM ENDEAVORS TO PROVIDE ACCURATE AND TIMELY 
                    INFORMATION, THE INFORMATION AVAILABLE ON THIS APP MAY INCLUDE 
                    INACCURACIES OR TYPOGRAPHICAL ERRORS. MOREOVER, RUNROOM MAY 
                    MAKE MODIFICATIONS AND/OR CHANGES IN THE APP OR IN THE 
                    INFORMATION AVAILABLE ON THE APP AT ANY TIME, FOR ANY REASON. 
                    YOU, THE USER, ASSUME THE SOLE RISK OF MAKING USE OF, AND/OR 
                    RELYING ON, THE INFORMATION AVAILABLE ON OR THROUGH THE APP. 
                    RUNROOM MAKES NO REPRESENTATIONS ABOUT THE SUITABILITY, 
                    COMPLETENESS, TIMELINESS, RELIABILITY, LEGALITY IN YOUR 
                    JURISDICTION, OR ACCURACY OF THE INFORMATION AVAILABLE ON OR 
                    THROUGH THE APP FOR ANY PURPOSE. SUCH INFORMATION IS PROVIDED 
                    ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTY OF ANY 
                    KIND, INCLUDING ALL IMPLIED WARRANTIES AND CONDITIONS OF 
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND 
                    NONINFRINGEMENT.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>14. Limitation of Liability</Text>
                <Text>
                    TO THE EXTENT PERMITTED BY LAW, RUNROOM SHALL NOT BE LIABLE 
                    FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR 
                    CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN ANY WAY CONNECTED 
                    WITH THE USE OF THE APP, ANY DELAY OR INABILITY TO USE THE APP, 
                    ANY DELAY OR INABILITY TO ACCESS YOUR ACCOUNT, UNAUTHORIZED 
                    USE OR MISUSE OF YOUR ACCOUNT, ANY INFORMATION AVAILABLE ON 
                    THE APP, OR OTHERWISE ARISING OUT OF THE USE OF THE APP, WHETHER 
                    BASED IN CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE, EVEN IF 
                    RUNROOM HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. 
                    BECAUSE SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR 
                    LIMITATION OF LIABILITY FOR CERTAIN TYPES OF DAMAGES SUCH AS 
                    CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY 
                    NOT APPLY TO YOU. IN SUCH JURISDICTIONS, TRAILSTEP’S ENTIRE 
                    LIABILITY AND YOUR EXCLUSIVE REMEDY WITH RESPECT TO YOUR USE OF 
                    THIS APP SHALL BE LIMITED TO THE EXTENT PERMITTED BY LAW.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>15. Indemnity</Text>
                <Text>
                    You agree to defend, indemnify, and hold harmless RUNROOM and its 
                    affiliates and all of their employees, agents, directors, officers, proprietors, 
                    partners, representatives, shareholders, attorneys, predecessors, 
                    successors, and assigns, from and against any and all claims, proceedings, 
                    damages, injuries, liabilities, losses, costs, and expenses (including 
                    reasonable attorneys’ fees and litigation expenses), relating to or arising 
                    from:
                    (i) your use of and access to the App; 
                    (ii) any breach by you of this Agreement; 
                    (iii) your violation of any third-party right, including, without limitation, any 
                    copyright, property or privacy right; and 
                    (iv) any claim that your content caused damage to a thirty-party. 
                    This defense and indemnification obligation will survive the Terms and your 
                    use of the App. You shall not in any event settle any matter without the prior 
                    written consent of RUNROOM to be withheld at RUNROOM’s sole 
                    discretion.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>16. App Access and Termination</Text>
                <Text>
                    The App is controlled and operated by RUNROOM from its offices within the 
                    United States. RUNROOM makes no representation that materials in the 
                    App are appropriate or available for use in other locations, and access to 
                    them from territories where any of the contents of this App are illegal is 
                    prohibited. Those who choose to access this App from other locations do so 
                    of their own volition and are responsible for compliance with applicable 
                    local laws. RUNROOM reserves the right at any time and for any reason to 
                    deny you access to the App and to terminate this Agreement.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>17. Submissions</Text>
                <Text>
                    Any ideas, suggestions, information, know-how, material, or any other 
                    content (collectively, “Content”) received through the App will be deemed 
                    to include a worldwide, royalty-free, perpetual, irrevocable, nonexclusive 
                    right and license for RUNROOM to adopt, publish, reproduce, disseminate, 
                    transmit, distribute, copy, use, create derivative works, display, (in whole or 
                    part), or otherwise act on such Content without additional approval or 
                    consideration, in any form, media, or technology now known or later 
                    developed for the full term of any rights that may exist in such Content, and 
                    you hereby waive any claim to the contrary.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>18. Governing Law</Text>
                <Text>
                    This Agreement has been made in, and will be construed and enforced in 
                    accordance with the laws of the State of New York without respect to its 
                    conflict of laws principles. Any action to enforce this Agreement will be 
                    brought in the federal or state courts presiding in New York, and all parties 
                    to this Agreement expressly agree to be subject to the jurisdiction of such 
                    courts. You agree that the App shall be deemed a passive webApp that does 
                    not give rise to personal jurisdiction over RUNROOM, either specific or 
                    general, in jurisdictions other than New York.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>19. Waiver</Text>
                <Text>
                    Failure to insist on strict performance of any of the Terms will not operate 
                    as a waiver of any subsequent default or failure of performance. No waiver 
                    by RUNROOM of any right under the Terms will be deemed to be either a 
                    waiver of any other right or provision or a waiver of that same right or 
                    provision at any other time.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>20. Severability</Text>
                <Text>
                    If any provision of the Terms shall be deemed unlawful, void or for any 
                    reason unenforceable, then that provision shall be deemed to be severable 
                    from the Terms and will be deemed superseded by a valid, enforceable 
                    provision that most clearly matches the intent of the original provision, and 
                    the remainder of the Terms shall continue in effect.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>21. Relationship</Text>
                <Text>
                    No joint venture, partnership, employment, or agency relationship exists 
                    between you and RUNROOM as a result of this Agreement or your use of 
                    the App.
                </Text>
                <Text style={[styles.docSubTitle, { fontSize: 15 * zoom, lineHeight: 19 * zoom }]}>22. Entire Agreement</Text>
                <Text>
                    The Terms, together with the RUNROOM Privacy Policy represent the entire 
                    agreement between you and RUNROOM with respect to use of and material 
                    available on or through the App, and supersede all prior or 
                    contemporaneous communications and proposals, whether electronic, 
                    oral, or written between you and RUNROOM with respect to the App. Any 
                    rights not expressly granted herein are expressly reserved.
                </Text>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.minusButton} onPress={pressMinusAction}>
                    <Icon name='minus' type='font-awesome-5' size={15}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.plusButton} onPress={pressPlusAction}>
                    <Icon name='plus' type='font-awesome-5' size={15}/>
                </TouchableOpacity>
            </View>
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
    },
    docContainer: {
        paddingHorizontal: 15,
        marginBottom: global.CONSTANTS.SPACE_40,
    },
    docTitle: {
        //fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    docDate: {
        //fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    docParagraph: {
        //fontSize: 14,
        textAlign: 'justify',
        //lineHeight: 18,
        marginBottom: 10,
    },
    docSubTitle: {
        //fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        //lineHeight: 19,
        marginTop: 5,
        marginBottom: 10,
    },
    bottomContainer: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: global.CONSTANTS.SPACE_40,
    },
    minusButton: {
        width: 60,
        height: 30,
        backgroundColor: 'rgba(98, 157, 143, 0.8)',
        marginRight: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusButton: {
        width: 60,
        height: 30,
        backgroundColor: 'rgba(98, 157, 143, 0.8)',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TermsAndConditions;
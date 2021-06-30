import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, Modal, FlatList } from 'react-native';
import global from '../global';
import css from '../css';
import SvgIcon from './svgIcon';

const FollowModal = (props) => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    return (
        <Modal
            animationType='slide'
            transparent
            visible={props.visible}
            onRequestClose={() => {}}
        >
            <View style={css.overlay}>
                <View style={css.modalContainer801}>
                    <View style={css.modalHeader}>
                        <Text style={css.modalTitleText}>Following</Text>
                        <Pressable style={css.modalCloseButton}>
                            <SvgIcon icon='Close'/>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

});

export default FollowModal;
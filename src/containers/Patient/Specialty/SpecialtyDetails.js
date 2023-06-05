import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedules from '../Doctor/DoctorSchedules';
import DoctorBookingInfo from '../Doctor/DoctorBookingInfo';
import DoctorProfile from '../Doctor/DoctorProfile';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';



import { getSpecialtyDetailsService } from '../../../services/userService';
import './SpecialtyDetails.scss'

class SpecialtyDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyDetails: {},
            specialtyId: -1,
            specialtyDoctors: [],

            provinces: [],
            selectedProvince: {
                value: 'ALL',
                label: 'Toàn quốc',
            },
            provinceLabel: '',

        }
    }

    handleSelectProvince = async (province) => {
        let copyState = { ...this.state };
        copyState['selectedProvince'] = province;

        await this.setState({
            ...copyState
        })
    }

    async componentDidMount() {
        this.props.getProvinces();

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let specialtyId = this.props.match.params.id;

            this.setState({
                specialtyId: specialtyId
            })

            let res = await getSpecialtyDetailsService(specialtyId);

            if (res && res.errorCode === 0) {
                console.log(res);
                this.setState({
                    specialtyDetails: res.data,
                    specialtyDoctors: res.data.Doctor_Infors
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.provinces !== this.props.provinces || prevProps.language !== this.props.language) {
            let provincesList = this.createProvinceOptions(this.props.provinces);

            this.setState({
                provinces: provincesList,
            })
        }
    }

    createProvinceOptions = (data) => {
        let optionsList = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            optionsList.push({
                label: 'Toàn quốc',
                value: 'ALL',
            })

            data.map((item, index) => {
                let option = {};

                option.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                option.value = item.keyMap;

                optionsList.push(option);
            })
        }
        return optionsList;
    }

    render() {
        let { specialtyDoctors, specialtyDetails } = this.state;
        console.log(this.state.selectedProvince.value);
        return (
            <div className='specialty-details-container'>
                <HomeHeader
                    isShowBanner={false}>
                </HomeHeader>

                <div className='specialty-details-body'>
                    <div className='specialty-content'>
                        <div className='specialty-title'>
                            {specialtyDetails.name}
                        </div>
                        {specialtyDetails && specialtyDetails.Markdown && specialtyDetails.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: specialtyDetails.Markdown.contentHTML }}>
                            </div>
                        }
                    </div >
                    <div className='col-4 province'>
                        <label><FormattedMessage id="admin.manage-doctor-infor.province"></FormattedMessage></label>
                        <Select
                            onChange={this.handleSelectProvince}
                            options={this.state.provinces}
                            value={this.state.selectedProvince}
                            placeholder={this.state.provinceLabel ? this.state.provinceLabel : 'Select Province'}
                            name='selectedProvince'
                        />
                    </div>

                    {specialtyDoctors && specialtyDoctors.length > 0 &&
                        specialtyDoctors.map((item, index) => {
                            return (
                                <>
                                    {(this.state.selectedProvince.value === item.province || this.state.selectedProvince.value === 'ALL') &&
                                        <div className='doctor'>
                                            <div className='specialty-left-content'>
                                                <div className='doctor-profile'>
                                                    <DoctorProfile
                                                        doctorId={item.doctorId}
                                                        isShowDoctorDescription={true}
                                                    ></DoctorProfile>
                                                </div>
                                            </div>
                                            <div className='specialty-right-content'>
                                                <div className='schedule'>
                                                    <DoctorSchedules
                                                        doctorIdFromDetails={item.doctorId}
                                                        key={index}>
                                                    </DoctorSchedules>
                                                </div>
                                                <div className='booking-info'>
                                                    <DoctorBookingInfo
                                                        doctorIdFromDetails={item.doctorId}
                                                        key={index}>
                                                    </DoctorBookingInfo>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

        provinces: state.admin.provinces,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProvinces: () => dispatch(actions.fetchProvinces()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetails);

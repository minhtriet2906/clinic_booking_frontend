import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions"
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import CustomScrollbars from '../../../components/CustomScrollbars';
class SearchDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            doctorOptions: [],
            clinicOptions: [],
            specialtyOptions: [],

            searchOptions: [],
        }
    }

    handleSearch = () => {
        this.setState({
            isSearching: true
        })


    }

    async componentDidMount() {

        let specialtiesList = this.createSpecialtiesListOptions(this.props.specialties);
        let doctorsList = this.createDoctorsListOptions(this.props.doctors);
        let clinicsList = this.createClinicsListOptions(this.props.clinics);



        this.setState({
            searchString: this.props.searchString,
            searchOptions: specialtiesList.concat(doctorsList.concat(clinicsList))
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let specialtiesList = this.createSpecialtiesListOptions(this.props.specialties);
        let doctorsList = this.createDoctorsListOptions(this.props.doctors);
        let clinicsList = this.createClinicsListOptions(this.props.clinics);

        if (prevProps.searchString !== this.props.searchString) {
            this.setState({
                searchString: this.props.searchString,
                doctorOptions: doctorsList,
                clinicOptions: clinicsList,
                specialtyOptions: specialtiesList
            })
        }
    }

    handleSelectOption = (option) => {
        // Perform any actions when an option is selected
        console.log(this.props);
        if (this.props.history && option.type === 'doctor') {
            this.props.history.push(`/doctor-details/${option.value}`);
        }
        if (this.props.history && option.type === 'clinic') {
            this.props.history.push(`/clinic-details/${option.value}`);
        }
        if (this.props.history && option.type === 'specialty') {
            this.props.history.push(`/specialty-details/${option.value}`);
        }
    };

    createDoctorsListOptions = (data) => {
        let doctorOptions = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                option.label = language === LANGUAGES.VI ? labelVi : labelEn;
                option.value = item.id;
                option.type = 'doctor';

                doctorOptions.push(option);
            })
        }
        return doctorOptions;
    }

    createClinicsListOptions = (data) => {
        let clinicOptions = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};
                option.label = item.name;
                option.value = item.id;
                option.type = 'clinic';
                clinicOptions.push(option);
            })
        }
        return clinicOptions;
    }

    createSpecialtiesListOptions = (data) => {
        let specialtyOptions = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};
                option.label = item.name;
                option.value = item.id;
                option.type = 'specialty'
                specialtyOptions.push(option);
            })
        }
        return specialtyOptions;
    }

    render() {
        console.log(this.state.doctorOptions);
        return (
            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>

                <div className='search-dropdown-container'>
                    {this.props.isSearching &&
                        (this.state.searchOptions.length > 0) &&
                        this.state.searchOptions.map((item, index) => {
                            return (
                                <div className='search-dropdown-doctor'>
                                    {<ul>
                                        {item.label.toLowerCase().includes(this.state.searchString.toLowerCase()) &&
                                            <li onClick={() => this.handleSelectOption(item)}>{item.label}</li>
                                        }
                                    </ul>}
                                </div>
                            )
                        })
                    }
                </div>
            </CustomScrollbars>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

        doctors: state.admin.doctors,
        clinics: state.admin.clinics,
        specialties: state.admin.specialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
        getAllClinics: () => dispatch(actions.fetchAllClinics()),
        getAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDropdown);

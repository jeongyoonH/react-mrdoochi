import React, { Component, Fragment } from 'react'
import * as TYPE from '../../../stringType'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as listActions from '../../../store/modules/list'
import { ChangeStatus } from '../../../functions/ChangeStatus'

class ExpandForm extends Component {
    status = ''
    handleStatus = (status) => {
        if (status === TYPE.NOTSTORED) return "아직 등록되지 않았습니다."
        else if (status === TYPE.REGISTERD) return "등록되었습니다."
        else if (status === TYPE.POSTED) return "포스팅 되었습니다."
        else return TYPE.ERROR
    }
    handleChangeStatus = async (e) => {
        this.status = e.target.value
        console.log(status)
        const { name, listActions } = this.props
        
        if (await ChangeStatus(name, status) === TYPE.SUCCESS){
            await listActions.handleStatus({name: name, status: status})
        }
    }
    render () {
        const {
            status,
            handleAdd,
            handleChange,
            handleRegister,
            handleDel,
            handleStore,
            handleInput1,
            handleInput2,
            blogList,
            operatorInfo,
            advertiserInfo
        } = this.props

        const urlForm = blogList.map(
            ({id, blog_url, status}) => {
                return (
                    <Fragment key={id}>
                        <input
                            value={blog_url}
                            type="text"
                            placeholder="블로그 추가"
                            autoComplete="off"
                            style={{marginTop: "20px", width: "50%", display: "block"}}
                            onChange={handleChange(id)}
                        />
                        <div style={{margin: "8px"}}>{this.handleStatus(status)}</div>
                        <button onClick={() => {handleDel(id)}} style={{display: "inline"}}>삭제</button>
                        {
                            status === TYPE.NOTSTORED &&
                            <button onClick={handleRegister(id)} style={{display: "inline"}}>등록</button>
                        }
                    </Fragment>
                )
            }
        )
        return (
            <Fragment>
                <select value={status} onChange={this.handleChangeStatus}>
                    <option value="">상태를 변경해 주세요</option>
                    {/* <option value={TYPE.WAITING}>요청대기</option>
                    <option value={TYPE.REQUESTING}>요청중</option>
                    <option value={TYPE.PLANNING}>기획중</option> */}
                    <option value={TYPE.MARKETING}>진행중</option>
                    <option value={TYPE.FINISH}>진행완료</option>
                </select>
                <section style={{margin: "30px"}}>
                    <label>영업자 이름, 전화번호</label>
                    <input
                        type="text"
                        placeholder="영업자 이름을 입력하세요"
                        style={{marginTop: "20px", width: "50%", display: "block"}}
                        name="name"
                        value={operatorInfo.name}
                        onChange={handleInput1}
                        autoComplete="off"
                    />
                    <input
                        type="tel"
                        placeholder="영업자 전화번호를 입력하세요"
                        style={{marginTop: "20px", width: "50%", display: "block"}}
                        name="phoneNumber"
                        value={operatorInfo.phoneNumber}
                        onChange={handleInput1}
                        autoComplete="off"
                    />
                </section>
                <section style={{margin: "30px"}}>
                    <label>광고주 이름, 전화번호</label>
                    <input
                        type="text"
                        placeholder="광고주 이름을 입력하세요"
                        style={{marginTop: "20px", width: "50%", display: "block"}}
                        name="name"
                        value={advertiserInfo.name}
                        onChange={handleInput2}
                        autoComplete="off"
                    />
                    <input
                        type="tel"
                        placeholder="광고주 전화번호를 입력하세요"
                        style={{marginTop: "20px", width: "50%", display: "block"}}
                        name="phoneNumber"
                        value={advertiserInfo.phoneNumber}
                        onChange={handleInput2}
                        autoComplete="off"
                    />
                    <button
                        type="text"
                        onClick={handleStore}
                        style={{marginTop: "20px", width: "50%", height: "30px", display: "inline"}}

                        { this.status.value===''?"disabled":' ' }

                        
                    >
                    저장
                    </button>
                </section>
                <hr style={{width: "80%"}}/>
                <section style={{margin: "30px"}}>
                    <label>블로그를 추가하세요</label>
                    <button className="add-box" onClick={handleAdd}>+</button>
                    {urlForm}
                </section>
            </Fragment>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        listActions: bindActionCreators(listActions, dispatch)
    })
  )(ExpandForm)

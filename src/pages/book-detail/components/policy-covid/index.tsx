import { AtModal } from "taro-ui"
import './index.less';

const text = `2022年7月9日更新入住要求:
鉴于当前疫情出现复发现象，在这个非常时期，务必要严格按照酒店疫情防控要求及规章制度执行，以下为入住翔顺金水台温泉酒店的要求：
1、所有入住的客人，均需签健康承诺书（到店签）+粤康码+行程码绿码+佩戴口罩;
2、行程码7天途径省外地区或省内中高风险地区需持48小时核酸阴性报告方可办理入住。
3、除第2点外其他客人，凭绿码+行程码绿码入住。
4、健康码呈（黄码或红码）的，一律暂不接待入住。
5、客人佩戴口罩进入自助餐厅及取餐。`

const ModalPolicyCovid = () => {
  return (
    <AtModal
      className="u-modal-policy-covid"
      isOpened
      title='防疫政策'
      confirmText='我知道了'
      content={text}
    />
  );
}
export default ModalPolicyCovid;
<template>
  <div class="example-container" id="example-container">
    <div class="title">ImageButton组件示例:</div>
    <image-button :imgPath="'#'" :title="'手动配准'"></image-button>

    <div class="title">布局切换组件示例:</div>
    <layout-switch :imgPath="'#'" :title="'2x2'" :layoutName="'2x2hip'" @changeLayout="changeLayout"></layout-switch>
    <layout-switch :imgPath="'#'" :title="'1x3'" :layoutName="'1x3hip'" @changeLayout="changeLayout"></layout-switch>

    <div class="title">序列切换组件示例:</div>
    <series-list :seriesList="series"></series-list>

    <div class="title">组织列表组件示例:</div>
    <tissue-list :tissueList="tissues"></tissue-list>

    <div class="title">选择框组件示例</div>
    <st-select
      v-model:value="selectOption"
      @change="handleChangeOperationSide($event)"
      width="146px"
      :allowClear="true"
      :options="options"
    ></st-select>

    <div class="title">颜色选择器组件</div>
    <color-picker
      :colorOptions="colorOptions"
      @changeSettingOpen="changeSettingOpen"
      @changeColor="changeColor"
    ></color-picker>

    <div class="title">进度条组件</div>
    <a-button type="primary" style="height: 40px; width: 160px" @click="showProgress">Open Progress</a-button>
    <st-progress
      :visible="progressVisible"
      :progressContent="progressContent"
      :progressPercent="progressPercent"
    ></st-progress>

    <div class="title">截图按钮组件</div>
    <screen-shot
      :imgPath="'#'"
      :title="'截屏'"
      v-model:select="isSelected"
      :targetDom="'body'"
      :saveFileName="'截图'"
    ></screen-shot>

    <div class="title">弹窗提示组件</div>
    <a-button type="primary" style="height: 40px; width: 160px" @click="showMessageTip">Open MessageTip</a-button>
    <message-tip
      v-model:isVisible="tipVisible"
      :tipContent="tipContent"
      :maskClosable="false"
      @onOk="onOkClick"
      @onCancel="onCancelClick"
    ></message-tip>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { TissueItem } from './packages/TissueList/interface';
import { colorPickerConfig } from './config/colorpicker.config';
const changeLayout = (layoutName: string) => {
  console.log(layoutName);
};
const series = [
  {
    index: 1,
    IsSelected: false,
    Thumbnail:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA2CAYAAACfkiopAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAxySURBVGhD5dp1kF1VEgZwPLi7Q3B3dwsUThHc3d3d3UNwhwQJkODuXrg7FFC4u9O7v949s5PsmWTem0n+mVvV9eb1u3K+1u/0neH+fUQXlaqyK0hV2RWkquwKUlV2Bakqh7oMP/zwVf0wlKqyaQForLHGijHHHDNGH330GHXUUVt+G3HEEWPqqaeOJZZYIlZcccWYdtppY4wxxhjod9dMMskksdBCC8XMM88c44wzTsvvnSxVZcMC8KSTThrTTTddApptttlisskmiwkmmCDmnnvu2GOPPeLcc8+NY445Jq677rr49NNP44ILLohDDz00dtttt1hppZXy/Nlnnz222GKL2HvvvWPXXXeNtddeO2acccahESFVZUMywggjJNDpp58+ll9++dh+++2jZ8+eCWDppZeOkUYaKeacc8544YUX4tdff43Wx++//x433XRTTD755BkFrt1vv/3i6quvTmPssMMOsd1226Uxa8/ugFSVDQnQFnrGGWfETjvtFEsuuWTMM888Md9888VSSy2V4brYYovFs88+GzfccEN89dVX8c8//8QHH3wQ11xzTVx//fUx//zzx8EHHxzLLrtsGsm1dCuvvHKcdNJJGfqdHPZVZbtFDgP9999/x+233x577bVXLLjggjHvvPPGLLPMkgBGGWWUmGuuuWLdddfNPN5ll13i0ksvjR133DEmnHDCzHu/L7DAArHIIou0AGe8DTbYIK666qrYd999Y8stt4xxxx23uo4mpKpsl/DAtttuG99++22GsHw94YQTYv3110+vC10gFDBpMOuss+Z166yzTp4r/313zgorrBBTTTVVzDHHHBklPCxKdt5557j55pvjr7/+im+++SbWWmutzsr3qnKIwnPrrbdeXHHFFRm2FnbyySdnLlo478pvFX7KKadM0Dzv2s033zzzdvfdd49u3bplDVAY5bl6wUgLL7xwS9149913448//sioUifcy3mDrqlBqSqHKBZ1xBFHZOV9//3344033ojvvvsuw7d4RBgDwLM8Os0002RqTDTRRNmy1lxzzQQNvELIQK2fobi99NJL8cUXX8Srr74ar7/+enz88cdZ8Rmp9blNSFU5WLHYHj16ZE726tUr7r///rjjjjuySFnYoosump7mFWEsJRQq17nedTPMMEOGrShw3iabbDIQGNHyySefJOCHHnooP5988sno169fdO/ePVZfffWBOEITUlUOVnhQQRKeAwYMiNtuuy1D0AJ//PHH7NEnnnhikhjeB4z3pQfv6uuu32qrrTKv3dN5JVImnnjiNKa64fPRRx+NF198Md56661ME/cZf/zxM0I6EPJVZZsy8sgjJ0kpYE477bS45ZZb4qmnnspwl4svv/xyPPjgg5n/2JfrALZg1wPrOvcp9/WbIsiY7iefydtvv53d4plnnsn2t+qqq7ZcI1oYt3xvUKrKNqVQUX9jVA8//HA8/fTTWXF5qH///tl6tKE11lgjbrzxxsxvoa3wCecDDzwwiYnqDzzvHX300bHccsvFXXfdlaTG/USPwinHpZJwP+SQQzJ1SnSUtTQhVWWbMtpoo+Wn/EJYHnjggfjwww/T05dffnkccMABubjNNtssvYPBAYWRPffcc3HsscdmYSv3s3CtS61AZtzP9a5BcV955ZVkeK+99loa+JJLLhkIrL4uisr3BqSqbFPKQ8Yee+xcxN133x0//PBD5jjQ+++/fzIwXsXB9Xm5fNhhhyWwQSt3Eb8/8cQTSYAOOuigOOqoo9Kw1157bfz222/ZLhVOEdSawTFCaZMNSlVZFXldHuKBd955Z7YyBObMM8/MBfOWT8CFvM3JPvvsk20PJyfyfdD78rBNC8KC3Bx55JFpDPdV2IQ8A7z33nsZSWVXp3uUKGxQqsqqaEelhajscg5obYaHLJbXiY2GfisCyDbbbJMVGTitqNxTBDEMcMcdd1ycfvrpcfzxx8epp56aLJA88sgjLcVOL5cW2qPrAW+yrVWVVeEpIa6woJaff/55hjkuDThCw0uAAs6LPO/7nnvumZ9CFcMr91QAgQZYirjHOeeck2Fuc8KY77zzTua5A3C5jvC4XtgPdeC8I6z0YVb//vvvs/hYKM/wmDAtBc53QIQ+esooouPiiy/OezEgI+gEGJ9Kz1gXXnhhAu/du3e2PUSmHCo+g9sFuocuM9RzvIS6XdN9992XwPVrRjjllFNyyHD44YenpxjAZyl0PAT4Rx99lEVKlDDYm2++mQUSNdXKGAJguQ20beyge3gdBEFCdDiiMMIGpaqsiiKkF5N77703fvrpp9w5AW6RJTcZgbe1LoYA3pZSLit2hhWY2+KLLx6rrbZatr7HH388C5g8BtSeHRHi3T///PO/kP9zqPBSxwZG6iE/tfUOQarKqrCsvmlmhrj88ssvGbZnn312ggeax0jJeV7328Ybb5wcu+zU7L/1bxsR+3b7cNQU+NYHnfsL92IYR58+fbLOGFfV1toOqSqrAjh2pSBpK4AbQiAaQg9I+Ym/X3TRRZm7+DUuz1jmaTzMW4qfdqfXux9qa8fnXtKhGABVdR4Wp5C61mZIGxVF4403XnWt7ZCqsioKCSsjGV9++WX8/PPPGfLnn39+LlgFRmR4RR4K0eeffz77rrpgOKGAKUxbb711TmIInfC3IzNqUgwZ1VG87L7aoTbKEFLhvPPOy2FFba3tkKqyKkgLr/Ck/q2YIRUKHKqJpQnNcmg7G264YY6ReNvEFHUFnMh33wFX/BiGiA70l2Ed9vm6gZGW+qEe+E0RbM3iGpSqsk1RTISytmIxFvDYY49lXuPsX3/9depUfMVOGBs4tJ6Y+sTkygiZERAcRjDVMbJiAIZxb1RXDVDEtC6R5fkKZ9nWNiFVZZsiz7UaoYhRlU2K8dA999wTZ511VvJrFV0EyGVtTHoIayCB1bd9AudvoH2XAhtttFHu3HQDxVPdAH7TTTfNoijyVHzdQCS13rQ0IFVlm4J0yEc57pCD9slXXnllC9vSt01UgNfWAJeXQANowUgQkdeKVCEwWh4C5LvO4H5apY4hxBlYvksxOd/6TUyDUlW2KYCbmWFm5TAvB9rihDfP8g4WJicB51kbEFHAKEJXziqW9u5AAysy3FukMIDvWB+66xnoLdCKJ85vjF325g1KVTlYMXmxaC3GgYkBCTTGJmR5jpeB9hswchp44SyX5buKv8oqqyRoAF3jHs4F3PX0rvPqqZAZfd3wcpjlOAHciEieORQaBQ8FtVDe0ZKAUIAYBHDeYxTe1b+dJ/QZgqHKdrZsad2rXMsYpjLlEPaAD7OqTvRzD9W7hZw8NxvTguS1RdptASBPiUIFOMBSAUg64Ilz6VRs3vYb5qdlynHzvEJqpJbJjpRrkq6SqnKwgrNjWvITQXFoYao8wBaLppaFA0OAE7a8XsDyKo+KDOf4W4gzlu/y+tZbb828dihu3q+Z1bU1zWmnVJVDFNV0iimmyP5snOxANPr27ZtgFDWeKttVwOR62aaW0BYdwtn5gAJdjOB63QI3cDCuNue5akwHvE2qynaJPEchhV2hmNqcKQswvK+vC39AAAIcWK0N71a06BmIYYgowf1FDWpaDka1DRVpnltbUwNSVbZLDAIKgeCdkoMWa/eEUgLOAIAUULztLYqqrpXJaR53DnJU9uSfffZZ3s9hszPTTDPls4yqa+tpUKrKdgsP8LzQx7LKISdtXQFQBEkxgCqurxsy+C6feVykXHbZZVmxdYpy2JMjOp5nD97kcHFQqSobEu2NGPzZMRkUOESA0AfEVhIwIIEreetcwGxFnWu4USLHbyq4TuB9m2foJrU1NCFVZUOCOeHQPK/FCPsCrBymKkLXrq4MEwZ3IEe4P4MpaAYg0qqDBa21VJUNi3z3ltQrIq+WhLC+jtW191C1zfJUdnRU0URJpZF7dlKIF6kqmxLg5aJXwzwvl5EWPdskpS1P6wiKoe0ogKY0trO2wEAD3+QObHBSVTYtwl719f5cThr8a2XaGHA2GSWPiZSQw/6LwtBimWWWyTxWLxQyRmTQ2rM6KFVlh8XChb68FKKMgbUxggpurOx9ulYGuH8dcQ1xDYJifFy7dydJVdlpYhio8JmkKn7m8qYo9OUtiDA2LXWOCWwH9tiNSFXZ6eL1k8IndHkU+zKLM1s3MMS7m3wx0KxUlV1BqsquIFVlV5D/V9r5lL6pEPlOVNzW52FRbf02LEWRbOtfPRVPPEBh/Z9+uPgXHsy5kGSXSgsAAAAASUVORK5CYII=',
    Thickness: 10,
    Modality: 'CT',
    ImageCount: 100,
    Description: '髋关节',
  },
  {
    index: 2,
    IsSelected: true,
    Thumbnail:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA2CAYAAACfkiopAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAxySURBVGhD5dp1kF1VEgZwPLi7Q3B3dwsUThHc3d3d3UNwhwQJkODuXrg7FFC4u9O7v949s5PsmWTem0n+mVvV9eb1u3K+1u/0neH+fUQXlaqyK0hV2RWkquwKUlV2Bakqh7oMP/zwVf0wlKqyaQForLHGijHHHDNGH330GHXUUVt+G3HEEWPqqaeOJZZYIlZcccWYdtppY4wxxhjod9dMMskksdBCC8XMM88c44wzTsvvnSxVZcMC8KSTThrTTTddApptttlisskmiwkmmCDmnnvu2GOPPeLcc8+NY445Jq677rr49NNP44ILLohDDz00dtttt1hppZXy/Nlnnz222GKL2HvvvWPXXXeNtddeO2acccahESFVZUMywggjJNDpp58+ll9++dh+++2jZ8+eCWDppZeOkUYaKeacc8544YUX4tdff43Wx++//x433XRTTD755BkFrt1vv/3i6quvTmPssMMOsd1226Uxa8/ugFSVDQnQFnrGGWfETjvtFEsuuWTMM888Md9888VSSy2V4brYYovFs88+GzfccEN89dVX8c8//8QHH3wQ11xzTVx//fUx//zzx8EHHxzLLrtsGsm1dCuvvHKcdNJJGfqdHPZVZbtFDgP9999/x+233x577bVXLLjggjHvvPPGLLPMkgBGGWWUmGuuuWLdddfNPN5ll13i0ksvjR133DEmnHDCzHu/L7DAArHIIou0AGe8DTbYIK666qrYd999Y8stt4xxxx23uo4mpKpsl/DAtttuG99++22GsHw94YQTYv3110+vC10gFDBpMOuss+Z166yzTp4r/313zgorrBBTTTVVzDHHHBklPCxKdt5557j55pvjr7/+im+++SbWWmutzsr3qnKIwnPrrbdeXHHFFRm2FnbyySdnLlo478pvFX7KKadM0Dzv2s033zzzdvfdd49u3bplDVAY5bl6wUgLL7xwS9149913448//sioUifcy3mDrqlBqSqHKBZ1xBFHZOV9//3344033ojvvvsuw7d4RBgDwLM8Os0002RqTDTRRNmy1lxzzQQNvELIQK2fobi99NJL8cUXX8Srr74ar7/+enz88cdZ8Rmp9blNSFU5WLHYHj16ZE726tUr7r///rjjjjuySFnYoosump7mFWEsJRQq17nedTPMMEOGrShw3iabbDIQGNHyySefJOCHHnooP5988sno169fdO/ePVZfffWBOEITUlUOVnhQQRKeAwYMiNtuuy1D0AJ//PHH7NEnnnhikhjeB4z3pQfv6uuu32qrrTKv3dN5JVImnnjiNKa64fPRRx+NF198Md56661ME/cZf/zxM0I6EPJVZZsy8sgjJ0kpYE477bS45ZZb4qmnnspwl4svv/xyPPjgg5n/2JfrALZg1wPrOvcp9/WbIsiY7iefydtvv53d4plnnsn2t+qqq7ZcI1oYt3xvUKrKNqVQUX9jVA8//HA8/fTTWXF5qH///tl6tKE11lgjbrzxxsxvoa3wCecDDzwwiYnqDzzvHX300bHccsvFXXfdlaTG/USPwinHpZJwP+SQQzJ1SnSUtTQhVWWbMtpoo+Wn/EJYHnjggfjwww/T05dffnkccMABubjNNtssvYPBAYWRPffcc3HsscdmYSv3s3CtS61AZtzP9a5BcV955ZVkeK+99loa+JJLLhkIrL4uisr3BqSqbFPKQ8Yee+xcxN133x0//PBD5jjQ+++/fzIwXsXB9Xm5fNhhhyWwQSt3Eb8/8cQTSYAOOuigOOqoo9Kw1157bfz222/ZLhVOEdSawTFCaZMNSlVZFXldHuKBd955Z7YyBObMM8/MBfOWT8CFvM3JPvvsk20PJyfyfdD78rBNC8KC3Bx55JFpDPdV2IQ8A7z33nsZSWVXp3uUKGxQqsqqaEelhajscg5obYaHLJbXiY2GfisCyDbbbJMVGTitqNxTBDEMcMcdd1ycfvrpcfzxx8epp56aLJA88sgjLcVOL5cW2qPrAW+yrVWVVeEpIa6woJaff/55hjkuDThCw0uAAs6LPO/7nnvumZ9CFcMr91QAgQZYirjHOeeck2Fuc8KY77zzTua5A3C5jvC4XtgPdeC8I6z0YVb//vvvs/hYKM/wmDAtBc53QIQ+esooouPiiy/OezEgI+gEGJ9Kz1gXXnhhAu/du3e2PUSmHCo+g9sFuocuM9RzvIS6XdN9992XwPVrRjjllFNyyHD44YenpxjAZyl0PAT4Rx99lEVKlDDYm2++mQUSNdXKGAJguQ20beyge3gdBEFCdDiiMMIGpaqsiiKkF5N77703fvrpp9w5AW6RJTcZgbe1LoYA3pZSLit2hhWY2+KLLx6rrbZatr7HH388C5g8BtSeHRHi3T///PO/kP9zqPBSxwZG6iE/tfUOQarKqrCsvmlmhrj88ssvGbZnn312ggeax0jJeV7328Ybb5wcu+zU7L/1bxsR+3b7cNQU+NYHnfsL92IYR58+fbLOGFfV1toOqSqrAjh2pSBpK4AbQiAaQg9I+Ym/X3TRRZm7+DUuz1jmaTzMW4qfdqfXux9qa8fnXtKhGABVdR4Wp5C61mZIGxVF4403XnWt7ZCqsioKCSsjGV9++WX8/PPPGfLnn39+LlgFRmR4RR4K0eeffz77rrpgOKGAKUxbb711TmIInfC3IzNqUgwZ1VG87L7aoTbKEFLhvPPOy2FFba3tkKqyKkgLr/Ck/q2YIRUKHKqJpQnNcmg7G264YY6ReNvEFHUFnMh33wFX/BiGiA70l2Ed9vm6gZGW+qEe+E0RbM3iGpSqsk1RTISytmIxFvDYY49lXuPsX3/9depUfMVOGBs4tJ6Y+sTkygiZERAcRjDVMbJiAIZxb1RXDVDEtC6R5fkKZ9nWNiFVZZsiz7UaoYhRlU2K8dA999wTZ511VvJrFV0EyGVtTHoIayCB1bd9AudvoH2XAhtttFHu3HQDxVPdAH7TTTfNoijyVHzdQCS13rQ0IFVlm4J0yEc57pCD9slXXnllC9vSt01UgNfWAJeXQANowUgQkdeKVCEwWh4C5LvO4H5apY4hxBlYvksxOd/6TUyDUlW2KYCbmWFm5TAvB9rihDfP8g4WJicB51kbEFHAKEJXziqW9u5AAysy3FukMIDvWB+66xnoLdCKJ85vjF325g1KVTlYMXmxaC3GgYkBCTTGJmR5jpeB9hswchp44SyX5buKv8oqqyRoAF3jHs4F3PX0rvPqqZAZfd3wcpjlOAHciEieORQaBQ8FtVDe0ZKAUIAYBHDeYxTe1b+dJ/QZgqHKdrZsad2rXMsYpjLlEPaAD7OqTvRzD9W7hZw8NxvTguS1RdptASBPiUIFOMBSAUg64Ilz6VRs3vYb5qdlynHzvEJqpJbJjpRrkq6SqnKwgrNjWvITQXFoYao8wBaLppaFA0OAE7a8XsDyKo+KDOf4W4gzlu/y+tZbb828dihu3q+Z1bU1zWmnVJVDFNV0iimmyP5snOxANPr27ZtgFDWeKttVwOR62aaW0BYdwtn5gAJdjOB63QI3cDCuNue5akwHvE2qynaJPEchhV2hmNqcKQswvK+vC39AAAIcWK0N71a06BmIYYgowf1FDWpaDka1DRVpnltbUwNSVbZLDAIKgeCdkoMWa/eEUgLOAIAUULztLYqqrpXJaR53DnJU9uSfffZZ3s9hszPTTDPls4yqa+tpUKrKdgsP8LzQx7LKISdtXQFQBEkxgCqurxsy+C6feVykXHbZZVmxdYpy2JMjOp5nD97kcHFQqSobEu2NGPzZMRkUOESA0AfEVhIwIIEreetcwGxFnWu4USLHbyq4TuB9m2foJrU1NCFVZUOCOeHQPK/FCPsCrBymKkLXrq4MEwZ3IEe4P4MpaAYg0qqDBa21VJUNi3z3ltQrIq+WhLC+jtW191C1zfJUdnRU0URJpZF7dlKIF6kqmxLg5aJXwzwvl5EWPdskpS1P6wiKoe0ogKY0trO2wEAD3+QObHBSVTYtwl719f5cThr8a2XaGHA2GSWPiZSQw/6LwtBimWWWyTxWLxQyRmTQ2rM6KFVlh8XChb68FKKMgbUxggpurOx9ulYGuH8dcQ1xDYJifFy7dydJVdlpYhio8JmkKn7m8qYo9OUtiDA2LXWOCWwH9tiNSFXZ6eL1k8IndHkU+zKLM1s3MMS7m3wx0KxUlV1BqsquIFVlV5D/V9r5lL6pEPlOVNzW52FRbf02LEWRbOtfPRVPPEBh/Z9+uPgXHsy5kGSXSgsAAAAASUVORK5CYII=',
    Thickness: 10,
    Modality: 'CT',
    ImageCount: 100,
    Description: '膝关节序列',
  },
  {
    index: 3,
    IsSelected: false,
    Thumbnail:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA2CAYAAACfkiopAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAxySURBVGhD5dp1kF1VEgZwPLi7Q3B3dwsUThHc3d3d3UNwhwQJkODuXrg7FFC4u9O7v949s5PsmWTem0n+mVvV9eb1u3K+1u/0neH+fUQXlaqyK0hV2RWkquwKUlV2Bakqh7oMP/zwVf0wlKqyaQForLHGijHHHDNGH330GHXUUVt+G3HEEWPqqaeOJZZYIlZcccWYdtppY4wxxhjod9dMMskksdBCC8XMM88c44wzTsvvnSxVZcMC8KSTThrTTTddApptttlisskmiwkmmCDmnnvu2GOPPeLcc8+NY445Jq677rr49NNP44ILLohDDz00dtttt1hppZXy/Nlnnz222GKL2HvvvWPXXXeNtddeO2acccahESFVZUMywggjJNDpp58+ll9++dh+++2jZ8+eCWDppZeOkUYaKeacc8544YUX4tdff43Wx++//x433XRTTD755BkFrt1vv/3i6quvTmPssMMOsd1226Uxa8/ugFSVDQnQFnrGGWfETjvtFEsuuWTMM888Md9888VSSy2V4brYYovFs88+GzfccEN89dVX8c8//8QHH3wQ11xzTVx//fUx//zzx8EHHxzLLrtsGsm1dCuvvHKcdNJJGfqdHPZVZbtFDgP9999/x+233x577bVXLLjggjHvvPPGLLPMkgBGGWWUmGuuuWLdddfNPN5ll13i0ksvjR133DEmnHDCzHu/L7DAArHIIou0AGe8DTbYIK666qrYd999Y8stt4xxxx23uo4mpKpsl/DAtttuG99++22GsHw94YQTYv3110+vC10gFDBpMOuss+Z166yzTp4r/313zgorrBBTTTVVzDHHHBklPCxKdt5557j55pvjr7/+im+++SbWWmutzsr3qnKIwnPrrbdeXHHFFRm2FnbyySdnLlo478pvFX7KKadM0Dzv2s033zzzdvfdd49u3bplDVAY5bl6wUgLL7xwS9149913448//sioUifcy3mDrqlBqSqHKBZ1xBFHZOV9//3344033ojvvvsuw7d4RBgDwLM8Os0002RqTDTRRNmy1lxzzQQNvELIQK2fobi99NJL8cUXX8Srr74a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',
    Thickness: 10,
    Modality: 'CT',
    ImageCount: 100,
    Description: '髋关节',
  },
  {
    index: 4,
    IsSelected: false,
    Thumbnail:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA2CAYAAACfkiopAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAxySURBVGhD5dp1kF1VEgZwPLi7Q3B3dwsUThHc3d3d3UNwhwQJkODuXrg7FFC4u9O7v949s5PsmWTem0n+mVvV9eb1u3K+1u/0neH+fUQXlaqyK0hV2RWkquwKUlV2Bakqh7oMP/zwVf0wlKqyaQForLHGijHHHDNGH330GHXUUVt+G3HEEWPqqaeOJZZYIlZcccWYdtppY4wxxhjod9dMMskksdBCC8XMM88c44wzTsvvnSxVZcMC8KSTThrTTTddApptttlisskmiwkmmCDmnnvu2GOPPeLcc8+NY445Jq677rr49NNP44ILLohDDz00dtttt1hppZXy/Nlnnz222GKL2HvvvWPXXXeNtddeO2acccahESFVZUMywggjJNDpp58+ll9++dh+++2jZ8+eCWDppZeOkUYaKeacc8544YUX4tdff43Wx++//x433XRTTD755BkFrt1vv/3i6quvTmPssMMOsd1226Uxa8/ugFSVDQnQFnrGGWfETjvtFEsuuWTMM888Md9888VSSy2V4brYYovFs88+GzfccEN89dVX8c8//8QHH3wQ11xzTVx//fUx//zzx8EHHxzLLrtsGsm1dCuvvHKcdNJJGfqdHPZVZbtFDgP9999/x+233x577bVXLLjggjHvvPPGLLPMkgBGGWWUmGuuuWLdddfNPN5ll13i0ksvjR133DEmnHDCzHu/L7DAArHIIou0AGe8DTbYIK666qrYd999Y8stt4xxxx23uo4mpKpsl/DAtttuG99++22GsHw94YQTYv3110+vC10gFDBpMOuss+Z166yzTp4r/313zgorrBBTTTVVzDHHHBklPCxKdt5557j55pvjr7/+im+++SbWWmutzsr3qnKIwnPrrbdeXHHFFRm2FnbyySdnLlo478pvFX7KKadM0Dzv2s033zzzdvfdd49u3bplDVAY5bl6wUgLL7xwS9149913448//sioUifcy3mDrqlBqSqHKBZ1xBFHZOV9//3344033ojvvvsuw7d4RBgDwLM8Os0002RqTDTRRNmy1lxzzQQNvELIQK2fobi99NJL8cUXX8Srr74ar7/+enz88cdZ8Rmp9blNSFU5WLHYHj16ZE726tUr7r///rjjjjuySFnYoosump7mFWEsJRQq17nedTPMMEOGrShw3iabbDIQGNHyySefJOCHHnooP5988sno169fdO/ePVZfffWBOEITUlUOVnhQQRKeAwYMiNtuuy1D0AJ//PHH7NEnnnhikhjeB4z3pQfv6uuu32qrrTKv3dN5JVImnnjiNKa64fPRRx+NF198Md56661ME/cZf/zxM0I6EPJVZZsy8sgjJ0kpYE477bS45ZZb4qmnnspwl4svv/xyPPjgg5n/2JfrALZg1wPrOvcp9/WbIsiY7iefydtvv53d4plnnsn2t+qqq7ZcI1oYt3xvUKrKNqVQUX9jVA8//HA8/fTTWXF5qH///tl6tKE11lgjbrzxxsxvoa3wCecDDzwwiYnqDzzvHX300bHccsvFXXfdlaTG/USPwinHpZJwP+SQQzJ1SnSUtTQhVWWbMtpoo+Wn/EJYHnjggfjwww/T05dffnkccMABubjNNtssvYPBAYWRPffcc3HsscdmYSv3s3CtS61AZtzP9a5BcV955ZVkeK+99loa+JJLLhkIrL4uisr3BqSqbFPKQ8Yee+xcxN133x0//PBD5jjQ+++/fzIwXsXB9Xm5fNhhhyWwQSt3Eb8/8cQTSYAOOuigOOqoo9Kw1157bfz222/ZLhVOEdSawTFCaZMNSlVZFXldHuKBd955Z7YyBObMM8/MBfOWT8CFvM3JPvvsk20PJyfyfdD78rBNC8KC3Bx55JFpDPdV2IQ8A7z33nsZSWVXp3uUKGxQqsqqaEelhajscg5obYaHLJbXiY2GfisCyDbbbJMVGTitqNxTBDEMcMcdd1ycfvrpcfzxx8epp56aLJA88sgjLcVOL5cW2qPrAW+yrVWVVeEpIa6woJaff/55hjkuDThCw0uAAs6LPO/7nnvumZ9CFcMr91QAgQZYirjHOeeck2Fuc8KY77zzTua5A3C5jvC4XtgPdeC8I6z0YVb//vvvs/hYKM/wmDAtBc53QIQ+esooouPiiy/OezEgI+gEGJ9Kz1gXXnhhAu/du3e2PUSmHCo+g9sFuocuM9RzvIS6XdN9992XwPVrRjjllFNyyHD44YenpxjAZyl0PAT4Rx99lEVKlDDYm2++mQUSNdXKGAJguQ20beyge3gdBEFCdDiiMMIGpaqsiiKkF5N77703fvrpp9w5AW6RJTcZgbe1LoYA3pZSLit2hhWY2+KLLx6rrbZatr7HH388C5g8BtSeHRHi3T///PO/kP9zqPBSxwZG6iE/tfUOQarKqrCsvmlmhrj88ssvGbZnn312ggeax0jJeV7328Ybb5wcu+zU7L/1bxsR+3b7cNQU+NYHnfsL92IYR58+fbLOGFfV1toOqSqrAjh2pSBpK4AbQiAaQg9I+Ym/X3TRRZm7+DUuz1jmaTzMW4qfdqfXux9qa8fnXtKhGABVdR4Wp5C61mZIGxVF4403XnWt7ZCqsioKCSsjGV9++WX8/PPPGfLnn39+LlgFRmR4RR4K0eeffz77rrpgOKGAKUxbb711TmIInfC3IzNqUgwZ1VG87L7aoTbKEFLhvPPOy2FFba3tkKqyKkgLr/Ck/q2YIRUKHKqJpQnNcmg7G264YY6ReNvEFHUFnMh33wFX/BiGiA70l2Ed9vm6gZGW+qEe+E0RbM3iGpSqsk1RTISytmIxFvDYY49lXuPsX3/9depUfMVOGBs4tJ6Y+sTkygiZERAcRjDVMbJiAIZxb1RXDVDEtC6R5fkKZ9nWNiFVZZsiz7UaoYhRlU2K8dA999wTZ511VvJrFV0EyGVtTHoIayCB1bd9AudvoH2XAhtttFHu3HQDxVPdAH7TTTfNoijyVHzdQCS13rQ0IFVlm4J0yEc57pCD9slXXnllC9vSt01UgNfWAJeXQANowUgQkdeKVCEwWh4C5LvO4H5apY4hxBlYvksxOd/6TUyDUlW2KYCbmWFm5TAvB9rihDfP8g4WJicB51kbEFHAKEJXziqW9u5AAysy3FukMIDvWB+66xnoLdCKJ85vjF325g1KVTlYMXmxaC3GgYkBCTTGJmR5jpeB9hswchp44SyX5buKv8oqqyRoAF3jHs4F3PX0rvPqqZAZfd3wcpjlOAHciEieORQaBQ8FtVDe0ZKAUIAYBHDeYxTe1b+dJ/QZgqHKdrZsad2rXMsYpjLlEPaAD7OqTvRzD9W7hZw8NxvTguS1RdptASBPiUIFOMBSAUg64Ilz6VRs3vYb5qdlynHzvEJqpJbJjpRrkq6SqnKwgrNjWvITQXFoYao8wBaLppaFA0OAE7a8XsDyKo+KDOf4W4gzlu/y+tZbb828dihu3q+Z1bU1zWmnVJVDFNV0iimmyP5snOxANPr27ZtgFDWeKttVwOR62aaW0BYdwtn5gAJdjOB63QI3cDCuNue5akwHvE2qynaJPEchhV2hmNqcKQswvK+vC39AAAIcWK0N71a06BmIYYgowf1FDWpaDka1DRVpnltbUwNSVbZLDAIKgeCdkoMWa/eEUgLOAIAUULztLYqqrpXJaR53DnJU9uSfffZZ3s9hszPTTDPls4yqa+tpUKrKdgsP8LzQx7LKISdtXQFQBEkxgCqurxsy+C6feVykXHbZZVmxdYpy2JMjOp5nD97kcHFQqSobEu2NGPzZMRkUOESA0AfEVhIwIIEreetcwGxFnWu4USLHbyq4TuB9m2foJrU1NCFVZUOCOeHQPK/FCPsCrBymKkLXrq4MEwZ3IEe4P4MpaAYg0qqDBa21VJUNi3z3ltQrIq+WhLC+jtW191C1zfJUdnRU0URJpZF7dlKIF6kqmxLg5aJXwzwvl5EWPdskpS1P6wiKoe0ogKY0trO2wEAD3+QObHBSVTYtwl719f5cThr8a2XaGHA2GSWPiZSQw/6LwtBimWWWyTxWLxQyRmTQ2rM6KFVlh8XChb68FKKMgbUxggpurOx9ulYGuH8dcQ1xDYJifFy7dydJVdlpYhio8JmkKn7m8qYo9OUtiDA2LXWOCWwH9tiNSFXZ6eL1k8IndHkU+zKLM1s3MMS7m3wx0KxUlV1BqsquIFVlV5D/V9r5lL6pEPlOVNzW52FRbf02LEWRbOtfPRVPPEBh/Z9+uPgXHsy5kGSXSgsAAAAASUVORK5CYII=',
    Thickness: 10,
    Modality: 'CT',
    ImageCount: 100,
    Description: '膝关节序列',
  },
  {
    index: 5,
    IsSelected: false,
    Thumbnail:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA2CAYAAACfkiopAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAxySURBVGhD5dp1kF1VEgZwPLi7Q3B3dwsUThHc3d3d3UNwhwQJkODuXrg7FFC4u9O7v949s5PsmWTem0n+mVvV9eb1u3K+1u/0neH+fUQXlaqyK0hV2RWkquwKUlV2Bakqh7oMP/zwVf0wlKqyaQForLHGijHHHDNGH330GHXUUVt+G3HEEWPqqaeOJZZYIlZcccWYdtppY4wxxhjod9dMMskksdBCC8XMM88c44wzTsvvnSxVZcMC8KSTThrTTTddApptttlisskmiwkmmCDmnnvu2GOPPeLcc8+NY445Jq677rr49NNP44ILLohDDz00dtttt1hppZXy/Nlnnz222GKL2HvvvWPXXXeNtddeO2acccahESFVZUMywggjJNDpp58+ll9++dh+++2jZ8+eCWDppZeOkUYaKeacc8544YUX4tdff43Wx++//x433XRTTD755BkFrt1vv/3i6quvTmPssMMOsd1226Uxa8/ugFSVDQnQFnrGGWfETjvtFEsuuWTMM888Md9888VSSy2V4brYYovFs88+GzfccEN89dVX8c8//8QHH3wQ11xzTVx//fUx//zzx8EHHxzLLrtsGsm1dCuvvHKcdNJJGfqdHPZVZbtFDgP9999/x+233x577bVXLLjggjHvvPPGLLPMkgBGGWWUmGuuuWLdddfNPN5ll13i0ksvjR133DEmnHDCzHu/L7DAArHIIou0AGe8DTbYIK666qrYd999Y8stt4xxxx23uo4mpKpsl/DAtttuG99++22GsHw94YQTYv3110+vC10gFDBpMOuss+Z166yzTp4r/313zgorrBBTTTVVzDHHHBklPCxKdt5557j55pvjr7/+im+++SbWWmutzsr3qnKIwnPrrbdeXHHFFRm2FnbyySdnLlo478pvFX7KKadM0Dzv2s033zzzdvfdd49u3bplDVAY5bl6wUgLL7xwS9149913448//sioUifcy3mDrqlBqSqHKBZ1xBFHZOV9//3344033ojvvvsuw7d4RBgDwLM8Os0002RqTDTRRNmy1lxzzQQNvELIQK2fobi99NJL8cUXX8Srr74a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',
    Thickness: 10,
    Modality: 'CT',
    ImageCount: 100,
    Description: '髋关节',
  },
  {
    index: 6,
    IsSelected: false,
    Thumbnail:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA2CAYAAACfkiopAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAxySURBVGhD5dp1kF1VEgZwPLi7Q3B3dwsUThHc3d3d3UNwhwQJkODuXrg7FFC4u9O7v949s5PsmWTem0n+mVvV9eb1u3K+1u/0neH+fUQXlaqyK0hV2RWkquwKUlV2Bakqh7oMP/zwVf0wlKqyaQForLHGijHHHDNGH330GHXUUVt+G3HEEWPqqaeOJZZYIlZcccWYdtppY4wxxhjod9dMMskksdBCC8XMM88c44wzTsvvnSxVZcMC8KSTThrTTTddApptttlisskmiwkmmCDmnnvu2GOPPeLcc8+NY445Jq677rr49NNP44ILLohDDz00dtttt1hppZXy/Nlnnz222GKL2HvvvWPXXXeNtddeO2acccahESFVZUMywggjJNDpp58+ll9++dh+++2jZ8+eCWDppZeOkUYaKeacc8544YUX4tdff43Wx++//x433XRTTD755BkFrt1vv/3i6quvTmPssMMOsd1226Uxa8/ugFSVDQnQFnrGGWfETjvtFEsuuWTMM888Md9888VSSy2V4brYYovFs88+GzfccEN89dVX8c8//8QHH3wQ11xzTVx//fUx//zzx8EHHxzLLrtsGsm1dCuvvHKcdNJJGfqdHPZVZbtFDgP9999/x+233x577bVXLLjggjHvvPPGLLPMkgBGGWWUmGuuuWLdddfNPN5ll13i0ksvjR133DEmnHDCzHu/L7DAArHIIou0AGe8DTbYIK666qrYd999Y8stt4xxxx23uo4mpKpsl/DAtttuG99++22GsHw94YQTYv3110+vC10gFDBpMOuss+Z166yzTp4r/313zgorrBBTTTVVzDHHHBklPCxKdt5557j55pvjr7/+im+++SbWWmutzsr3qnKIwnPrrbdeXHHFFRm2FnbyySdnLlo478pvFX7KKadM0Dzv2s033zzzdvfdd49u3bplDVAY5bl6wUgLL7xwS9149913448//sioUifcy3mDrqlBqSqHKBZ1xBFHZOV9//3344033ojvvvsuw7d4RBgDwLM8Os0002RqTDTRRNmy1lxzzQQNvELIQK2fobi99NJL8cUXX8Srr74a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',
    Thickness: 10,
    Modality: 'CT',
    ImageCount: 100,
    Description: '膝关节序列',
  },
];

const tissues: TissueItem[] = [
  {
    tissueId: 1,
    name: '组织1',
    color: 'rgba(255,255,255,1)',
    visibility: true,
    isSelected: false,
    volume: 100,
    vrAlpha: 70,
    mprAlpha: 70,
    deleteEnabled: true,
    selected: false,
  },
  {
    tissueId: 1,
    name: '组织1',
    color: 'rgba(255,255,255,1)',
    visibility: true,
    isSelected: false,
    volume: 100,
    vrAlpha: 70,
    mprAlpha: 70,
    deleteEnabled: true,
    selected: false,
  },
  {
    tissueId: 1,
    name: '组织1',
    color: 'rgba(255,255,255,1)',
    visibility: true,
    isSelected: false,
    volume: 100,
    vrAlpha: 70,
    mprAlpha: 70,
    deleteEnabled: true,
    selected: false,
  },
];

const selectOption = ref('');

const options = [
  {
    value: 'value1',
    label: '选项1',
  },
  {
    value: 'value2',
    label: '选项2',
  },
];

const handleChangeOperationSide = (option: string) => {
  console.log(option);
};

const colorOptions = ref(colorPickerConfig.colorOptions);

const changeSettingOpen = () => {
  console.log('关闭');
};

const changeColor = (color: string) => {
  console.log(color);
};

const progressVisible = ref(false);
const progressContent = ref('');
const progressPercent = ref(50);

const showProgress = () => {
  const func = () => {
    if (progressPercent.value < 100) {
      progressVisible.value = true;
      progressPercent.value += 10;
      progressContent.value = '加载中...';
    } else {
      progressVisible.value = false;
    }
    return func;
  };
  setInterval(func(), 1000);
};

const isSelected = ref(false);

const tipVisible = ref(false);
const tipContent = ref('');

const showMessageTip = () => {
  tipVisible.value = !tipVisible.value;
  tipContent.value = '这是一条提示框信息！';
};

const onOkClick = () => {
  console.log('ok');
};

const onCancelClick = () => {
  console.log('cancel');
};
</script>

<style lang="less">
.example-container {
  width: 40%;
  margin: 0 auto;
  .title {
    padding: 8px;
  }
}
</style>

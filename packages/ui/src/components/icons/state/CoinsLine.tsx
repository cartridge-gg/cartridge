import { memo } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

export const CoinsLineIcon = memo((props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M9.26 6.922c.04.037.09.075.143.112-.481.019-.95.06-1.403.121V6.52c0-.48.269-.873.606-1.166.34-.296.803-.538 1.335-.732C11.003 4.23 12.437 4 14 4c1.534 0 2.997.231 4.06.62.53.195.993.437 1.334.733.337.293.606.686.606 1.166v6.862c0 .485-.256.888-.597 1.196a4.66 4.66 0 0 1-1.337.769A8.55 8.55 0 0 1 17 15.67v-1.039a8 8 0 0 0 .712-.227c.463-.18.804-.378 1.022-.576.216-.195.266-.35.266-.447v-2.085c-.272.177-.587.33-.934.463a8.55 8.55 0 0 1-1.066.324v-1.039a8 8 0 0 0 .712-.226c.463-.18.804-.381 1.022-.577.216-.223.266-.35.266-.447V7.971a4.928 4.928 0 0 1-.94.447 9.577 9.577 0 0 1-1.876.46c-.056-.088-.115-.117-.175-.17a4.675 4.675 0 0 0-1.056-.709c1.085-.072 2.044-.264 2.738-.529.493-.17.834-.361 1.05-.548.218-.189.259-.327.259-.403 0-.076-.04-.214-.26-.402-.215-.187-.556-.379-1.05-.55-.9-.34-2.215-.56-3.69-.56s-2.79.22-3.719.56c-.465.171-.806.363-1.022.55-.218.188-.287.326-.287.402 0 .076.069.214.287.403ZM4 10.55c0-.482.267-.872.606-1.194.34-.267.805-.51 1.334-.705 1.063-.39 2.497-.62 4.06-.62 1.534 0 2.997.23 4.06.62.53.195.993.438 1.334.705.337.322.606.712.606 1.194v6.861c0 .485-.256.888-.597 1.197a4.66 4.66 0 0 1-1.337.768c-1.063.41-2.504.624-4.066.624-1.59 0-3.002-.214-4.067-.623-.531-.205-.995-.46-1.335-.769C4.258 18.3 4 17.896 4 17.411V10.55Zm1.258.403c.216.186.558.378 1.024.548.927.34 2.243.56 3.718.56s2.79-.22 3.69-.56c.494-.17.835-.362 1.05-.548.22-.189.26-.327.26-.403 0-.076-.04-.214-.26-.403-.215-.186-.556-.378-1.05-.548-.9-.369-2.215-.56-3.69-.56s-2.79.191-3.718.56c-.466.17-.808.362-1.024.548-.217.189-.258.327-.258.403 0 .075.04.214.258.403Zm8.801 1.496c-1.062.39-2.525.62-4.059.62-1.563 0-2.997-.23-4.06-.62a5.097 5.097 0 0 1-.94-.447v1.823c0 .098.05.223.267.447.216.195.558.397 1.022.576.927.353 2.236.583 3.711.583 1.475 0 2.784-.23 3.713-.583.462-.18.803-.38 1.021-.576.216-.224.266-.35.266-.447v-1.823c-.275.17-.594.32-.94.447Zm-8.792 5.41c.216.198.558.396 1.022.576.927.353 2.236.557 3.711.557 1.475 0 2.784-.204 3.713-.557.462-.18.803-.378 1.021-.576.216-.196.266-.35.266-.448v-2.084c-.272.176-.588.33-.934.463-1.063.41-2.504.649-4.066.649-1.59 0-3.002-.24-4.067-.65a6.493 6.493 0 0 1-.961-.462v2.085c0 .097.078.252.295.447Z"
    />
  </Icon>
));

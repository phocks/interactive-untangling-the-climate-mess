export const animate = () => {
  return ks
    .animate(
      "#Redtangle-1",
      [
        { p: "opacity", t: [1500, 1875, 2250], v: [1, 0, 1], e: [[3, 1], [3, 1], [0]] },
        {
          p: "strokeDashoffset",
          t: [0, 1500, 2250, 3542],
          v: [5586.5, -400, -400, 5586.5],
          e: [[1, 0, 0, 0.6, 1], [1, 0.4, 0, 0.6, 1], [1, 0, 0, 0.6, 1], [0]],
        },
        {
          p: "d",
          t: [0, 1500, 2250, 3542],
          v: [
            "path('M195.6,198.2C168.8,473.1,102.1,440.7,56.7,525.7C39.6,557.7,7.7,702.8,73.3,695.6C132.1,689.1,181.4,629.5,240.1,632.9C260.8,634.1,317.3,647.4,319.4,653.9C329.2,685.3,235.3,683.9,197.5,681.8C181.4,680.9,155,675.5,144.3,661.6C133.8,648,144.7,619.9,147,604.5C153.5,560.8,165.1,519.1,152.7,474.8C140.8,432.5,104.6,413.6,68.3,440.4C55.8,449.6,43.1,459.2,35,472.4C27.3,485,24,501.8,21.4,516.4C5.9,603,74.2,655.8,139.3,695.3C172,715.3,219,736.7,258.2,725.5C284.9,717.9,291.4,685,291.2,660C290.7,601.4,268.5,569.9,272.1,510.8C273.4,488.9,294.2,463.3,312.2,476.6C324.8,485.8,324.2,549.4,330.5,591.8C332.6,605.6,332.3,620.3,335.9,633.8C336.7,636.9,338.8,647.1,343.1,647.6C349.1,648.4,355.4,619.5,356,615.3C360.6,584.4,362,548.9,355,518C352.9,508.7,347.9,487.8,334.9,490.3C319.6,493.3,308.9,519.3,299.5,530C292.2,538.4,284.4,546.8,275,553C249.8,569.8,215.5,577.7,208.7,612.6C206.4,624.3,211.9,639.9,215.4,650.6C220.1,664.9,216.9,680.9,210.9,694.7C197.1,726.6,155.1,735,125.5,716.9C68.7,682.2,113.7,609.8,137.1,570.9C142.6,561.7,151,555.1,156,545.6C162,534,167.5,522,172,509.8C179,490.7,192.2,436.1,162.7,426.7C143.9,420.7,125,439.1,115.4,451.9C85.3,492.1,76.1,537.2,69.3,585.4C66.7,603.8,62.7,644.1,35.9,630.2C4.2,613.8,-15.9,573.7,-12.8,539.4C-11.6,525.7,0,496.5,17.4,496C33,495.6,32,531.6,33.7,541.5C39.6,574.4,39.9,620.5,58.7,648.7C71.5,667.9,101.2,671.7,121.2,658.8C130.3,652.9,135.6,640.8,141,631.7C152.6,612.3,163.3,594.3,152.4,571.7C134.5,534.3,45,530.1,82.8,481.6C87.5,475.6,144.5,457.1,154.8,452.8C196.3,435.5,223.1,407.1,241.9,441.3C254.6,464.4,288.7,506.5,285.2,534.5C284.1,542.7,277.4,552.1,273.2,559.1C258.4,584.1,225,619.1,233.6,651.1C238.5,669.5,239.7,667.8,257.1,667.4C287.5,666.6,339.5,655.1,347.4,624.2C348.8,618.7,346.6,613.2,345.6,607.7C334.5,550.7,265.7,610.5,238,588C207.7,563.4,250.1,514.7,256.5,487.3C259.3,475.2,265.7,433.4,249.4,429C222,421.5,194.4,472.1,178,488.4C158.4,508.1,130.9,529.3,117.4,554C97.5,590.4,105.2,648.9,137.5,676.6C162,697.6,189.8,688.3,213.9,672.6C257.7,644,291.4,611.1,266.3,557.1C262,548,256.6,535.2,249.4,528.1C212,491.2,187.4,531.9,188.2,571C188.5,587.1,187.9,604.3,195.6,616')",
            "path('M66,219C39.1,493.8,51,466,43,536C35,606,11.4,686.2,77,679C135.8,672.5,181.4,629.5,240.1,632.9C260.8,634.1,317.3,647.4,319.4,653.9C329.2,685.3,235.3,683.9,197.5,681.8C181.4,680.9,155,675.5,144.3,661.6C133.8,648,144.7,619.9,147,604.5C153.5,560.8,165.1,519.1,152.7,474.8C140.8,432.5,104.6,413.6,68.3,440.4C55.8,449.6,43.1,459.2,35,472.4C27.3,485,22.1,514.4,19.5,529C4,615.6,74.2,655.8,139.3,695.3C172,715.3,208.3,724.7,247.5,713.5C274.3,705.9,291.4,685,291.2,660C290.7,601.4,268.5,569.9,272.1,510.8C273.4,488.9,294.2,463.3,312.2,476.6C324.8,485.8,318.6,543.3,324.9,585.6C326.9,599.4,326.6,614.2,330.2,627.7C331.1,630.8,333.1,641,337.5,641.5C343.4,642.2,349.7,613.3,350.3,609.2C354.9,578.2,362,548.9,355,518C352.9,508.7,347.9,487.8,334.9,490.3C319.6,493.3,308.9,519.3,299.5,530C292.2,538.4,284.4,546.8,275,553C249.8,569.8,215.5,577.7,208.7,612.6C206.4,624.3,211.9,639.9,215.4,650.6C220.1,664.9,216.9,680.9,210.9,694.7C197.1,726.6,142.1,719.6,112.5,701.5C55.7,666.8,113.7,609.8,137.1,570.9C142.6,561.7,151,555.1,156,545.6C162,534,167.5,522,172,509.8C179,490.7,192.2,436.1,162.7,426.7C143.9,420.7,108.6,438.7,99,451.5C68.9,491.7,76.1,537.2,69.3,585.4C66.7,603.8,62.7,644.1,35.9,630.2C4.2,613.8,-18.3,596.6,-15.2,562.4C-14,548.6,-2.4,519.5,15,519C30.6,518.6,29.5,554.5,31.3,564.5C37.1,597.4,39.9,620.5,58.7,648.7C71.5,667.9,101.2,671.7,121.2,658.8C130.3,652.9,135.6,640.8,141,631.7C152.6,612.3,163.3,594.3,152.4,571.7C134.5,534.3,83.1,541.1,121,492.5C125.7,486.5,144.5,457.1,154.8,452.8C196.3,435.5,223.1,407.1,241.9,441.3C254.6,464.4,288.7,506.5,285.2,534.5C284.1,542.7,277.4,552.1,273.2,559.1C258.4,584.1,225,619.1,233.6,651.1C238.5,669.5,239.7,667.8,257.1,667.4C287.5,666.6,335.1,657,343,626C344.4,620.6,342.2,615,341.2,609.5C330.1,552.5,265.7,610.5,238,588C207.7,563.4,231.1,517.4,237.5,490C240.3,477.8,238.9,448.9,222.5,444.5C195.1,437.1,194.4,472.1,178,488.4C158.4,508.1,130.9,529.3,117.4,554C97.5,590.4,105.2,648.9,137.5,676.6C162,697.6,189.8,688.3,213.9,672.6C257.7,644,291.4,611.1,266.3,557.1C262,548,256.6,535.2,249.4,528.1C212,491.2,187.4,531.9,188.2,571C188.5,587.1,187.9,604.3,195.6,616')",
            "path('M66,219C39.1,493.8,51,466,43,536C35,606,11.4,686.2,77,679C135.8,672.5,181.4,629.5,240.1,632.9C260.8,634.1,317.3,647.4,319.4,653.9C329.2,685.3,235.3,683.9,197.5,681.8C181.4,680.9,155,675.5,144.3,661.6C133.8,648,144.7,619.9,147,604.5C153.5,560.8,165.1,519.1,152.7,474.8C140.8,432.5,104.6,413.6,68.3,440.4C55.8,449.6,43.1,459.2,35,472.4C27.3,485,22.1,514.4,19.5,529C4,615.6,74.2,655.8,139.3,695.3C172,715.3,208.3,724.7,247.5,713.5C274.3,705.9,291.4,685,291.2,660C290.7,601.4,268.5,569.9,272.1,510.8C273.4,488.9,294.2,463.3,312.2,476.6C324.8,485.8,318.6,543.3,324.9,585.6C326.9,599.4,326.6,614.2,330.2,627.7C331.1,630.8,333.1,641,337.5,641.5C343.4,642.2,349.7,613.3,350.3,609.2C354.9,578.2,362,548.9,355,518C352.9,508.7,347.9,487.8,334.9,490.3C319.6,493.3,308.9,519.3,299.5,530C292.2,538.4,284.4,546.8,275,553C249.8,569.8,215.5,577.7,208.7,612.6C206.4,624.3,211.9,639.9,215.4,650.6C220.1,664.9,216.9,680.9,210.9,694.7C197.1,726.6,142.1,719.6,112.5,701.5C55.7,666.8,113.7,609.8,137.1,570.9C142.6,561.7,151,555.1,156,545.6C162,534,167.5,522,172,509.8C179,490.7,192.2,436.1,162.7,426.7C143.9,420.7,108.6,438.7,99,451.5C68.9,491.7,76.1,537.2,69.3,585.4C66.7,603.8,62.7,644.1,35.9,630.2C4.2,613.8,-18.3,596.6,-15.2,562.4C-14,548.6,-2.4,519.5,15,519C30.6,518.6,29.5,554.5,31.3,564.5C37.1,597.4,39.9,620.5,58.7,648.7C71.5,667.9,101.2,671.7,121.2,658.8C130.3,652.9,135.6,640.8,141,631.7C152.6,612.3,163.3,594.3,152.4,571.7C134.5,534.3,83.1,541.1,121,492.5C125.7,486.5,144.5,457.1,154.8,452.8C196.3,435.5,223.1,407.1,241.9,441.3C254.6,464.4,288.7,506.5,285.2,534.5C284.1,542.7,277.4,552.1,273.2,559.1C258.4,584.1,225,619.1,233.6,651.1C238.5,669.5,239.7,667.8,257.1,667.4C287.5,666.6,335.1,657,343,626C344.4,620.6,342.2,615,341.2,609.5C330.1,552.5,265.7,610.5,238,588C207.7,563.4,231.1,517.4,237.5,490C240.3,477.8,238.9,448.9,222.5,444.5C195.1,437.1,194.4,472.1,178,488.4C158.4,508.1,130.9,529.3,117.4,554C97.5,590.4,105.2,648.9,137.5,676.6C162,697.6,189.8,688.3,213.9,672.6C257.7,644,291.4,611.1,266.3,557.1C262,548,256.6,535.2,249.4,528.1C212,491.2,187.4,531.9,188.2,571C188.5,587.1,187.9,604.3,195.6,616')",
            "path('M195.6,198.2C168.8,473.1,102.1,440.7,56.7,525.7C39.6,557.7,7.7,702.8,73.3,695.6C132.1,689.1,181.4,629.5,240.1,632.9C260.8,634.1,317.3,647.4,319.4,653.9C329.2,685.3,235.3,683.9,197.5,681.8C181.4,680.9,155,675.5,144.3,661.6C133.8,648,144.7,619.9,147,604.5C153.5,560.8,165.1,519.1,152.7,474.8C140.8,432.5,104.6,413.6,68.3,440.4C55.8,449.6,43.1,459.2,35,472.4C27.3,485,24,501.8,21.4,516.4C5.9,603,74.2,655.8,139.3,695.3C172,715.3,219,736.7,258.2,725.5C284.9,717.9,291.4,685,291.2,660C290.7,601.4,268.5,569.9,272.1,510.8C273.4,488.9,294.2,463.3,312.2,476.6C324.8,485.8,324.2,549.4,330.5,591.8C332.6,605.6,332.3,620.3,335.9,633.8C336.7,636.9,338.8,647.1,343.1,647.6C349.1,648.4,355.4,619.5,356,615.3C360.6,584.4,362,548.9,355,518C352.9,508.7,347.9,487.8,334.9,490.3C319.6,493.3,308.9,519.3,299.5,530C292.2,538.4,284.4,546.8,275,553C249.8,569.8,215.5,577.7,208.7,612.6C206.4,624.3,211.9,639.9,215.4,650.6C220.1,664.9,216.9,680.9,210.9,694.7C197.1,726.6,155.1,735,125.5,716.9C68.7,682.2,113.7,609.8,137.1,570.9C142.6,561.7,151,555.1,156,545.6C162,534,167.5,522,172,509.8C179,490.7,192.2,436.1,162.7,426.7C143.9,420.7,125,439.1,115.4,451.9C85.3,492.1,76.1,537.2,69.3,585.4C66.7,603.8,62.7,644.1,35.9,630.2C4.2,613.8,-15.9,573.7,-12.8,539.4C-11.6,525.7,0,496.5,17.4,496C33,495.6,32,531.6,33.7,541.5C39.6,574.4,39.9,620.5,58.7,648.7C71.5,667.9,101.2,671.7,121.2,658.8C130.3,652.9,135.6,640.8,141,631.7C152.6,612.3,163.3,594.3,152.4,571.7C134.5,534.3,45,530.1,82.8,481.6C87.5,475.6,144.5,457.1,154.8,452.8C196.3,435.5,223.1,407.1,241.9,441.3C254.6,464.4,288.7,506.5,285.2,534.5C284.1,542.7,277.4,552.1,273.2,559.1C258.4,584.1,225,619.1,233.6,651.1C238.5,669.5,239.7,667.8,257.1,667.4C287.5,666.6,339.5,655.1,347.4,624.2C348.8,618.7,346.6,613.2,345.6,607.7C334.5,550.7,265.7,610.5,238,588C207.7,563.4,250.1,514.7,256.5,487.3C259.3,475.2,265.7,433.4,249.4,429C222,421.5,194.4,472.1,178,488.4C158.4,508.1,130.9,529.3,117.4,554C97.5,590.4,105.2,648.9,137.5,676.6C162,697.6,189.8,688.3,213.9,672.6C257.7,644,291.4,611.1,266.3,557.1C262,548,256.6,535.2,249.4,528.1C212,491.2,187.4,531.9,188.2,571C188.5,587.1,187.9,604.3,195.6,616')",
          ],
          e: [[1, 0.4, 0, 0.6, 1], [1, 0.4, 0, 0.6, 1], [1, 0.4, 0, 0.6, 1], [0]],
        },
      ],
      "#Redtangle-2",
      [{ p: "opacity", t: [1500, 1875, 2250], v: [0, 1, 0], e: [[3, 1], [3, 1], [0]] }],
      { autoremove: false, markers: { 1: 0, "1a": 1500, 2: 2250 } }
    )
    .range(0, 3542);
};

export default animate;

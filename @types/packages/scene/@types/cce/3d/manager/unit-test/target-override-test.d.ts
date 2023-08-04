import { SceneFacadeManager } from '../../facade/scene-facade-manager';
import { IUnitTest } from './unit-test-interface';
declare class TargetOverrideTest implements IUnitTest {
    test(sceneFacadeMgr: SceneFacadeManager): Promise<boolean>;
}
declare const targetOverrideTest: TargetOverrideTest;
export { targetOverrideTest };
//# sourceMappingURL=target-override-test.d.ts.map
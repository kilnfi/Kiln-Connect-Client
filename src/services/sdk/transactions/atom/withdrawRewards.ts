import { setupSdk, searchInput, debugLog } from '../../utils';
import { Sdk } from '../../../../types/sdk';
import { Input } from '../../../../types/input';
import { OptionInputId } from '../../../../types/option';
import signAndBroadcast from './utils';

const withdrawRewards = async (sdk: Sdk, inputs: Input[]) => {
	const k = setupSdk(sdk);

	const params = {
		walletAddress: searchInput(inputs, OptionInputId.atomWalletAddress) as string,
    validatorAddress: searchInput(inputs, OptionInputId.atomValidatorAddress) as string,
		integration: searchInput(inputs, OptionInputId.atomIntegration) as string,
	};

	debugLog('ATOM WITHDRAW REWARDS', params);

	try {
		const tx = await k.atom.craftWithdrawRewardsTx(params.walletAddress, params.validatorAddress);
		const hash = await signAndBroadcast(k, sdk.integrations, params.integration, tx);
		return JSON.stringify(hash, undefined, 4);
	} catch (error) {
		console.error(error);
		return error;
	}
};

export default withdrawRewards;

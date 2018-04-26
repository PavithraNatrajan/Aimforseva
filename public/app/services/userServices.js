
angular.module('userServices',[])
.factory('Country',function($http)
{
	
	userFactory={};
	//user.create(regData); 
	userFactory.create=function(regData)
	{
				
		return $http.post('/api/countryMaster',regData);
	}
	return userFactory;
});

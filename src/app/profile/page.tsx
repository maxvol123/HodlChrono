"use client"
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";
import { Card, CardBody, CardHeader, Link } from "@heroui/react";
import { Switch } from "@heroui/switch";
import { Radio, RadioGroup } from "@heroui/radio";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateNotificationSettings } from "@/actions/notification";
import { getInvestmentAlertStatus } from "@/actions/getinvestmentalertstatus";
import ChipGreen from "../components/common/chip-green";

const Profile = () => {
  let [settings, setSettings] = useState<any>()
  const [interval, setInterval] = useState<string>()
  const [importingUpdates, setImportingUpdates] = useState<boolean>(false)
  const [investmentAlert, setInvestmentAlert] = useState<any>(false)
  const [statusokay, setStatusokay] = useState<boolean>(false)
  const [login, setLogin] = useState<boolean>(false)



  const { isAuth, status, setAuthState, session } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
  const email = session?.user?.email
    setInvestmentAlert(getInvestmentAlertStatus(email))
    if (status === "unauthenticated") {
      setLogin(false)
    }else{
      setLogin(true)
    }
  }, [status, router]);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.log("error ", error);
    }
    setAuthState("unauthenticated", null);
  };
 const SaveNotification = async ()=> {
  const email = session?.user?.email
  try {
    settings= {
      interval: interval,
      importingUpdates: importingUpdates
    }
    if (email) {
    updateNotificationSettings(email, settings)
    setStatusokay(true)
    }
  } catch (error) {
    
  }
 }

if (login) {
    return (
    <div>
      <Link className="text-inherit" href="#" onPress={handleSignOut}>
        Log Out
      </Link>
    <div className="min-h-screen py-8 w-[80vw]">
      <div className=" mx-auto px-4">
        <div className="w-full flex justify-center mb-5">
                    {statusokay&& 
        <ChipGreen>Data updated successfully</ChipGreen>
            }
            </div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your email notifications</p>
        </div>

        {/* Notifications Section */}
        <Card className="shadow-lg">
          <CardHeader className="pb-0">
            <h2 className="text-xl font-semibold">Buy Bitcoin Notifications</h2>
          </CardHeader>
          
          <CardBody className="space-y-6">
            
            {/* Recurring Buy Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-4">Recurring Buy Alerts</h3>
              <div className="space-y-4">



                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Investment Alert</p>
                    <p className="text-gray-600 text-sm">Reminder to invest in market</p>
                  </div>
                  <Switch color="success" isSelected={investmentAlert} onValueChange={setInvestmentAlert}/>
                </div>
              </div>
            </div>
            {/* Notification Frequency */}
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Schedule</h3>
<RadioGroup 
    color="success"
    orientation="horizontal"
    defaultValue="weekly"
    className="gap-6"
    onValueChange={(value) => setInterval(value)}
    isDisabled={!investmentAlert}
    >
    <Radio value="daily">Daily</Radio>
    <Radio value="weekly">Weekly</Radio>
    <Radio value="monthly">Monthly</Radio>
</RadioGroup>

            </div>
            <Divider />

            {/* Market Condition Alerts */}
            <div>
              <h3 className="text-lg font-medium mb-4">Market Condition Alerts</h3>
              <div className="space-y-4">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Importing Updates</p>
                    <p className="text-gray-600 text-sm">Notify when something important happend on market</p>
                  </div>
                  <Switch color="success" defaultSelected onValueChange={setImportingUpdates}/>
                </div>

              </div>
            </div>

          </CardBody>

          {/* Save Button */}
          <div className="flex justify-end p-6 border-t border-default-200">

            <Button onPress={SaveNotification} color="success" size="lg" className="font-semibold text-white">
              Save Notification Settings
            </Button>
          </div>
        </Card>

      </div>
    </div>
    </div>
  );
}else{
  return(
  <div>Login First</div>
  )
}

};

export default Profile;
